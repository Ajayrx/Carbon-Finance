import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Award,
  QrCode,
  FileText,
  Loader
} from 'lucide-react';

interface Certificate {
  id: string;
  farmActivity: string;
  credits: number;
  issueDate: string;
  status: 'pending' | 'verified' | 'issued';
  qrCode?: string;
}

interface VerificationStatus {
  aiVerified: boolean;
  govOfficerVerified: boolean;
  randomInspection: boolean;
  inspectionDate?: string;
}

const VerificationSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    aiVerified: true,
    govOfficerVerified: false,
    randomInspection: true,
    inspectionDate: '2025-01-20'
  });
  const [loading, setLoading] = useState(true);
  const [downloadingCert, setDownloadingCert] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchCertificates = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCertificates: Certificate[] = [
        {
          id: '1',
          farmActivity: 'Rice field monitoring',
          credits: 10,
          issueDate: '2025-01-15',
          status: 'issued',
          qrCode: 'QR123456'
        },
        {
          id: '2',
          farmActivity: 'Tree planting verification',
          credits: 15,
          issueDate: '2025-01-15',
          status: 'verified'
        },
        {
          id: '3',
          farmActivity: 'Sustainable farming practices',
          credits: 8,
          issueDate: '2025-01-10',
          status: 'pending'
        }
      ];
      
      setCertificates(mockCertificates);
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  const handleDownloadCertificate = async (certId: string) => {
    setDownloadingCert(certId);
    
    try {
      // Simulate certificate generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock certificate download
      const blob = new Blob(['Mock Certificate Content'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${certId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloadingCert(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'verified':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued':
        return <CheckCircle size={16} />;
      case 'verified':
        return <Shield size={16} />;
      case 'pending':
        return <Clock size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Verification & Certificates
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your verification status and download certificates
        </p>
      </motion.div>

      {/* Verification Status Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* AI Verification */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              verificationStatus.aiVerified 
                ? 'bg-green-100 dark:bg-green-900/30' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              <Shield size={20} className={
                verificationStatus.aiVerified 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400'
              } />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Verification</h3>
          </div>
          <div className="flex items-center space-x-2">
            {verificationStatus.aiVerified ? (
              <>
                <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400 font-medium">Verified by AI</span>
              </>
            ) : (
              <>
                <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">Pending Verification</span>
              </>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Satellite data analysis and machine learning validation
          </p>
        </div>

        {/* Government Verification */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              verificationStatus.govOfficerVerified 
                ? 'bg-blue-100 dark:bg-blue-900/30' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              <Award size={20} className={
                verificationStatus.govOfficerVerified 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400'
              } />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Government Verification</h3>
          </div>
          <div className="flex items-center space-x-2">
            {verificationStatus.govOfficerVerified ? (
              <>
                <CheckCircle size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 font-medium">Verified by Officer</span>
              </>
            ) : (
              <>
                <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">Awaiting Field Officer</span>
              </>
            )}
          </div>
          {verificationStatus.randomInspection && (
            <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle size={16} className="text-orange-600 dark:text-orange-400" />
                <span className="text-orange-600 dark:text-orange-400 font-medium text-sm">
                  Selected for Random Inspection
                </span>
              </div>
              <p className="text-orange-700 dark:text-orange-300 text-xs mt-1">
                Scheduled: {verificationStatus.inspectionDate}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Certificates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Digital Certificates</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Loader size={32} className="animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading certificates...</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {cert.farmActivity}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cert.credits} credits • {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cert.status)}`}>
                      {getStatusIcon(cert.status)}
                      <span className="capitalize">{cert.status}</span>
                    </span>
                    
                    {cert.status === 'issued' && (
                      <button
                        onClick={() => handleDownloadCertificate(cert.id)}
                        disabled={downloadingCert === cert.id}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 disabled:opacity-50"
                      >
                        {downloadingCert === cert.id ? (
                          <>
                            <Loader size={16} className="animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Download size={16} />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                {cert.qrCode && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-2">
                    <QrCode size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      QR Protected: {cert.qrCode}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Verification Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className={`p-6 rounded-xl border-2 ${
          verificationStatus.aiVerified 
            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <Shield size={24} className={
              verificationStatus.aiVerified 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-500 dark:text-gray-400'
            } />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Verification Badge
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {verificationStatus.aiVerified 
              ? 'Your farm data has been verified using satellite imagery and AI analysis.'
              : 'Pending AI verification of your submitted farm data.'
            }
          </p>
        </div>

        <div className={`p-6 rounded-xl border-2 ${
          verificationStatus.govOfficerVerified 
            ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <Award size={24} className={
              verificationStatus.govOfficerVerified 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400'
            } />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Government Officer Badge
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {verificationStatus.govOfficerVerified 
              ? 'Your farm has been physically verified by a government field officer.'
              : 'Awaiting physical verification by government field officer.'
            }
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationSection;