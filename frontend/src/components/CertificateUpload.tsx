import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Upload, FileText, CheckCircle, AlertCircle, Loader, QrCode } from 'lucide-react';

const CertificateUpload = () => {
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [certificateId, setCertificateId] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    credits?: number;
  } | null>(null);
  const { carbonBalance, updateCarbonBalance } = useAuth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateFile(file);
      setValidationResult(null);
    }
  };

  const handleValidation = async () => {
    if (!certificateFile && !certificateId) return;

    setIsValidating(true);
    setValidationResult(null);

    try {
      // Simulate API call to validate certificate
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock validation logic
      const isValidCertificate = certificateId.startsWith('CERT-') || certificateFile?.name.includes('certificate');
      
      if (isValidCertificate) {
        const creditsEarned = Math.floor(Math.random() * 20) + 10; // 10-30 credits
        setValidationResult({
          isValid: true,
          message: 'Certificate verified successfully! Credits have been added to your account.',
          credits: creditsEarned
        });
        
        // Update farmer's carbon balance
        updateCarbonBalance(carbonBalance + creditsEarned);
      } else {
        setValidationResult({
          isValid: false,
          message: 'Invalid certificate. Please check the certificate ID or file and try again.'
        });
      }
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: 'Validation failed. Please try again later.'
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Government Certificate
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your government-issued farming certificate to earn carbon credits
        </p>
      </div>

      <div className="space-y-6">
        {/* Certificate ID Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <QrCode size={16} className="inline mr-2" />
            Certificate ID or QR Code
          </label>
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter certificate ID (e.g., CERT-ABC123)"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Or Upload Certificate File
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-green-400 dark:hover:border-green-500 transition-colors">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
              id="certificate-upload"
            />
            <label htmlFor="certificate-upload" className="cursor-pointer">
              <FileText size={32} className="text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {certificateFile ? certificateFile.name : 'Click to upload certificate'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                PDF, JPG, or PNG files accepted
              </p>
            </label>
          </div>
        </div>

        {/* Validate Button */}
        <button
          onClick={handleValidation}
          disabled={(!certificateFile && !certificateId) || isValidating}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isValidating ? (
            <>
              <Loader size={20} className="animate-spin" />
              <span>Validating Certificate...</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              <span>Validate Certificate</span>
            </>
          )}
        </button>

        {/* Validation Result */}
        {validationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg flex items-center space-x-3 ${
              validationResult.isValid
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            {validationResult.isValid ? (
              <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
            )}
            <div>
              <p className={`font-medium ${
                validationResult.isValid 
                  ? 'text-green-800 dark:text-green-300' 
                  : 'text-red-800 dark:text-red-300'
              }`}>
                {validationResult.message}
              </p>
              {validationResult.credits && (
                <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                  +{validationResult.credits} carbon credits added to your account
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CertificateUpload;