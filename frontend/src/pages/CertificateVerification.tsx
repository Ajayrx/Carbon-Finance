import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  User, 
  MapPin, 
  Calendar,
  Leaf,
  Loader,
  QrCode
} from 'lucide-react';

interface CertificateDetails {
  certificateId: string;
  farmerName: string;
  farmerId: string;
  landId: string;
  cropType: string;
  landArea: string;
  treesPlanted: string;
  fertilizerUse: string;
  irrigationPractices: string;
  visitDate: string;
  officerName: string;
  dateIssued: string;
  status: 'active' | 'revoked';
  qrCode: string;
}

const CertificateVerification = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState<CertificateDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) {
        setError('No certificate ID provided');
        setLoading(false);
        return;
      }

      try {
        // Mock API call to verify certificate
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock certificate data - in real app, this would come from your database
        const mockCertificate: CertificateDetails = {
          certificateId: certificateId,
          farmerName: 'Rajesh Kumar',
          farmerId: 'FARM001',
          landId: 'LAND-001-2025',
          cropType: 'Rice (Paddy)',
          landArea: '2.5 acres',
          treesPlanted: '15 Mango trees',
          fertilizerUse: 'Organic compost (200kg)',
          irrigationPractices: 'Alternate wetting and drying',
          visitDate: '2025-01-15',
          officerName: 'Officer Singh',
          dateIssued: '2025-01-15',
          status: 'active',
          qrCode: `QR-${certificateId}`
        };
        
        setCertificate(mockCertificate);
      } catch (err) {
        setError('Failed to verify certificate. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader size={48} className="animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full mx-6"
        >
          <div className="text-center">
            <AlertCircle size={48} className="text-red-600 dark:text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Certificate Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'The certificate you are looking for does not exist or has been revoked.'}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Return to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {certificate.status === 'active' ? (
              <CheckCircle size={32} className="text-white" />
            ) : (
              <AlertCircle size={32} className="text-white" />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certificate Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Government-issued farming certificate details
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Status Banner */}
          <div className={`p-4 ${
            certificate.status === 'active'
              ? 'bg-green-100 dark:bg-green-900/30 border-b border-green-200 dark:border-green-800'
              : 'bg-red-100 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center justify-center space-x-2">
              {certificate.status === 'active' ? (
                <>
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-green-800 dark:text-green-300">
                    ✓ VERIFIED CERTIFICATE
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
                  <span className="font-semibold text-red-800 dark:text-red-300">
                    ⚠ REVOKED CERTIFICATE
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Certificate Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Government Verification Certificate
              </h2>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-mono">
                {certificate.certificateId}
              </p>
            </div>

            {/* Certificate Details */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Farmer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <User size={20} />
                  <span>Farmer Information</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.farmerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Farmer ID:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.farmerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Land ID:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.landId}</span>
                  </div>
                </div>
              </div>

              {/* Farm Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Leaf size={20} />
                  <span>Farm Details</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Crop Type:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.cropType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Land Area:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.landArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Trees Planted:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.treesPlanted}</span>
                  </div>
                </div>
              </div>

              {/* Agricultural Practices */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Agricultural Practices</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Fertilizer:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.fertilizerUse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Irrigation:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.irrigationPractices}</span>
                  </div>
                </div>
              </div>

              {/* Verification Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>Verification</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Visit Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(certificate.visitDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Officer:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.officerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Issue Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(certificate.dateIssued).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <QrCode size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">QR Code: {certificate.qrCode}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                This certificate can be verified at any time using the QR code or certificate ID
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateVerification;