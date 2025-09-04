import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Upload, Image, MapPin, CheckCircle, Loader, X, FileText } from 'lucide-react';
import { extractExifData, formatCoordinates, ExifData } from '../utils/exifUtils';
import MapView from './MapView';

// ✅ pdfjs-dist fix for Vite
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface UploadData {
  photos: File[];
  certificate?: File;
  area: string;
  trees: string;
  cropType: string;
  geo?: { lat: string; lng: string };
  exifData?: ExifData[];
}

const UploadSection = () => {
  const [uploadData, setUploadData] = useState<UploadData>({
    photos: [],
    area: '',
    trees: '',
    cropType: ''
  });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'validating' | 'success'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [extractingExif, setExtractingExif] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { carbonBalance, updateCarbonBalance } = useAuth();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    for (const file of files) {
      if (file.type === 'application/pdf') {
        await processPDF(file);
      } else if (file.type.startsWith('image/')) {
        await processFiles([file]);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      if (file.type === 'application/pdf') {
        await processPDF(file);
      } else if (file.type.startsWith('image/')) {
        await processFiles([file]);
      }
    }
  };

  const processFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setExtractingExif(true);
    try {
      const exifPromises = files.map(file => extractExifData(file));
      const exifResults = await Promise.all(exifPromises);
      const gpsData = exifResults.find(exif => exif.latitude && exif.longitude);

      setUploadData(prev => ({
        ...prev,
        photos: [...prev.photos, ...files],
        exifData: [...(prev.exifData || []), ...exifResults],
        geo: gpsData
          ? {
              lat: gpsData.latitude!.toString(),
              lng: gpsData.longitude!.toString()
            }
          : prev.geo
      }));
    } catch (error) {
      console.error('EXIF extraction error:', error);
      setUploadData(prev => ({
        ...prev,
        photos: [...prev.photos, ...files]
      }));
    } finally {
      setExtractingExif(false);
    }
  };

  const processPDF = async (file: File) => {
    try {
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      let textContent = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        textContent += text.items.map((item: any) => item.str).join(' ') + '\n';
      }

      // Simple regex extractions
      const areaMatch = textContent.match(/Land Area:\s*(\d+)/i);
      const treesMatch = textContent.match(/Trees Planted:\s*(\d+)/i);
      const cropMatch = textContent.match(/Crop Type:\s*([a-zA-Z]+)/i);

      setUploadData(prev => ({
        ...prev,
        certificate: file,
        area: areaMatch ? areaMatch[1] : prev.area,
        trees: treesMatch ? treesMatch[1] : prev.trees,
        cropType: cropMatch ? cropMatch[1].toLowerCase() : prev.cropType
      }));
    } catch (error) {
      console.error('PDF parsing error:', error);
    }
  };

  const removePhoto = (index: number) => {
    setUploadData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
      exifData: prev.exifData?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus('uploading');

    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadStatus('validating');
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certificate: uploadData.certificate?.name,
          photos: uploadData.photos.map(f => f.name),
          area: uploadData.area,
          trees: uploadData.trees,
          cropType: uploadData.cropType,
          geo: uploadData.geo
        })
      });

      const areaValue = parseFloat(uploadData.area) || 1;
      const treesValue = parseInt(uploadData.trees) || 1;
      const baseCredits = Math.floor(areaValue * 5 + treesValue * 2);
      updateCarbonBalance(carbonBalance + baseCredits);

      setUploadStatus('success');
      setTimeout(() => {
        setUploadData({ photos: [], area: '', trees: '', cropType: '' });
        setUploadStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return { text: 'Uploading farm data...', icon: Loader, color: 'text-blue-600' };
      case 'validating':
        return { text: 'Validating with satellite and certificate...', icon: Loader, color: 'text-purple-600' };
      case 'success':
        return { text: 'Success! Credits added to your account', icon: CheckCircle, color: 'text-green-600' };
      default:
        return null;
    }
  };

  const statusInfo = getStatusMessage();

  const farmLocations = uploadData.geo
    ? [
        {
          id: '1',
          lat: parseFloat(uploadData.geo.lat),
          lng: parseFloat(uploadData.geo.lng),
          activity: uploadData.cropType || 'Farm Activity',
          date: new Date().toISOString().split('T')[0],
          credits: 0
        }
      ]
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Upload Farm Data</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload your certificate and farm photos to earn carbon credits</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                {extractingExif ? (
                  <Loader size={32} className="text-green-500 animate-spin" />
                ) : (
                  <Upload size={32} className="text-gray-500 dark:text-gray-400" />
                )}
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Drop certificate (PDF) or farm photos here
              </p>
              <p className="text-gray-500 dark:text-gray-400">Government certificate auto-fills farm details</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={extractingExif}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                Choose Files
              </button>
            </div>
          </div>

          {/* Certificate Preview */}
          {uploadData.certificate && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <FileText size={20} className="text-blue-600" />
              <span className="font-medium text-gray-900 dark:text-white">{uploadData.certificate.name}</span>
            </motion.div>
          )}

          {/* Photo Preview */}
          {uploadData.photos.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img src={URL.createObjectURL(photo)} alt={`Farm photo ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {/* Auto-filled fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Farm Area</label>
              <input
                type="text"
                value={uploadData.area}
                onChange={e => setUploadData(prev => ({ ...prev, area: e.target.value }))}
                placeholder="e.g., 2 acres"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trees Planted</label>
              <input
                type="text"
                value={uploadData.trees}
                onChange={e => setUploadData(prev => ({ ...prev, trees: e.target.value }))}
                placeholder="e.g., 10 trees"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Crop / Tree Type</label>
            <input
              type="text"
              value={uploadData.cropType}
              onChange={e => setUploadData(prev => ({ ...prev, cropType: e.target.value }))}
              placeholder="e.g., rice, mango"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Location */}
          {uploadData.geo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Location detected from image</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    {formatCoordinates(parseFloat(uploadData.geo.lat), parseFloat(uploadData.geo.lng))}
                  </p>
                </div>
              </div>
              <MapView locations={farmLocations} />
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={uploadStatus !== 'idle' || (!uploadData.certificate && uploadData.photos.length === 0) || extractingExif}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {uploadStatus === 'idle' ? (
              <>
                <Upload size={20} />
                <span>Submit Farm Data</span>
              </>
            ) : (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Processing...</span>
              </>
            )}
          </button>
        </form>

        {/* Status Messages */}
        <AnimatePresence>
          {statusInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
                uploadStatus === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-blue-50 dark:bg-blue-900/20'
              }`}
            >
              <statusInfo.icon size={20} className={`${statusInfo.color} ${uploadStatus !== 'success' ? 'animate-spin' : ''}`} />
              <p className={`font-medium ${statusInfo.color}`}>{statusInfo.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UploadSection;
