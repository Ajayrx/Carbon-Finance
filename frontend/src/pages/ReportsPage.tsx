import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader, CheckCircle } from 'lucide-react';

const ReportsPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API call to /api/report
      const response = await fetch('/api/report');
      
      // For demo purposes, create a mock download
      const blob = new Blob(['Mock MRV Report Content'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mrv-report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3000);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          MRV Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Download your comprehensive monitoring, reporting, and verification documents
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <div className="text-center space-y-6">
          {/* Report Icon */}
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <FileText size={48} className="text-white" />
          </div>

          {/* Report Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive MRV Report
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Your complete monitoring, reporting, and verification document includes satellite validation, 
              carbon sequestration calculations, and registry-ready documentation for all your farming activities.
            </p>
          </div>

          {/* Report Details */}
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wide mb-2">
                Data Period
              </div>
              <div className="text-gray-900 dark:text-white font-medium">
                Jan 2025 - Current
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wide mb-2">
                Total Activities
              </div>
              <div className="text-gray-900 dark:text-white font-medium">
                12 Verified Submissions
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wide mb-2">
                File Format
              </div>
              <div className="text-gray-900 dark:text-white font-medium">
                PDF Document
              </div>
            </div>
          </div>

          {/* Download Button */}
          <motion.button
            onClick={handleDownloadReport}
            disabled={isDownloading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
          >
            {isDownloading ? (
              <>
                <Loader size={24} className="animate-spin" />
                <span>Generating Report...</span>
              </>
            ) : downloadComplete ? (
              <>
                <CheckCircle size={24} />
                <span>Download Complete!</span>
              </>
            ) : (
              <>
                <Download size={24} className="group-hover:scale-110 transition-transform" />
                <span>Download MRV Report (PDF)</span>
              </>
            )}
          </motion.button>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              What's included in your report:
            </h3>
            <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Satellite-verified farm data and measurements</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Carbon sequestration calculations and methodology</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Registry-ready documentation for carbon credit markets</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Timeline of all verified farming activities</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsPage;