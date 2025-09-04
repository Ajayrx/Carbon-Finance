import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OfficialsNavigation from '../components/OfficialsNavigation';
import { 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Eye, 
  XCircle,
  Users,
  Calendar,
  CheckCircle,
  Loader,
  Filter
} from 'lucide-react';
import { getCertificates } from '../api/officials';

interface Certificate {
  id: string;
  certificateId: string;
  farmerName: string;
  farmerId: string;
  landId: string;
  cropType: string;
  landArea: string;
  treesPlanted: string;
  fertilizerUse: string;
  fertilizerAmount: string;
  irrigationPractices: string;
  visitDate: string;
  officerName: string;
  dateIssued: string;
  status: 'active' | 'revoked';
  qrCode: string;
}

const OfficialsDashboard = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'revoked'>('all');
  const [downloadingCert, setDownloadingCert] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const response = await getCertificates();
        if (response.success) {
          setCertificates(response.certificates.map(cert => ({
            ...cert,
            status: cert.status as 'active' | 'revoked'
          })));
        }
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.farmerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadCertificate = async (cert: Certificate) => {
    setDownloadingCert(cert.id);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate certificate content
      const certificateContent = `
GOVERNMENT VERIFICATION CERTIFICATE

Certificate ID: ${cert.certificateId}
QR Code: ${cert.qrCode}

Farmer Details:
Name: ${cert.farmerName}
Farmer ID: ${cert.farmerId}
Land ID/Plot Number: ${cert.landId}

Farm Details:
Crop Type: ${cert.cropType}
Land Area: ${cert.landArea}
Trees Planted: ${cert.treesPlanted}
Fertilizer Use: ${cert.fertilizerUse} (${cert.fertilizerAmount})
Irrigation Practices: ${cert.irrigationPractices}

Verification Details:
Government Visit Date: ${cert.visitDate}
Verifying Officer: ${cert.officerName}
Issue Date: ${cert.dateIssued}

This certificate verifies the sustainable farming practices and land use of the above-mentioned farmer.

Verification URL: ${window.location.origin}/verify/${cert.certificateId}
      `;
      
      const blob = new Blob([certificateContent], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${cert.farmerName.replace(/\s+/g, '-')}-${cert.certificateId}.pdf`;
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

  const handleRevokeCertificate = async (certId: string) => {
    if (window.confirm('Are you sure you want to revoke this certificate? This action cannot be undone.')) {
      // Update certificate status
      setCertificates(prev => 
        prev.map(cert => 
          cert.id === certId 
            ? { ...cert, status: 'revoked' as const }
            : cert
        )
      );
    }
  };

  const handleViewCertificate = (certificateId: string) => {
    window.open(`/verify/${certificateId}`, '_blank');
  };

  const stats = {
    total: certificates.length,
    active: certificates.filter(c => c.status === 'active').length,
    revoked: certificates.filter(c => c.status === 'revoked').length,
    thisMonth: certificates.filter(c => {
      const certDate = new Date(c.dateIssued);
      const now = new Date();
      return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <>
      <OfficialsNavigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Officials Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage farmer certificates and verification processes
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Certificates</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active</h3>
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <XCircle size={20} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revoked</h3>
              </div>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.revoked}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">This Month</h3>
              </div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.thisMonth}</p>
            </div>
          </motion.div>

          {/* Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search farmers or certificate ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="revoked">Revoked</option>
                  </select>
                </div>
              </div>

              {/* Create Certificate Button */}
              <button
                onClick={() => navigate('/officials/certificate-form')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Create Certificate</span>
              </button>
            </div>
          </motion.div>

          {/* Certificates Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Farmer Certificates ({filteredCertificates.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <Loader size={32} className="animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading certificates...</p>
              </div>
            ) : filteredCertificates.length === 0 ? (
              <div className="p-8 text-center">
                <FileText size={48} className="text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No certificates found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start by creating your first farmer certificate'
                  }
                </p>
                <button
                  onClick={() => navigate('/officials/certificate-form')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <Plus size={20} />
                  <span>Create First Certificate</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Farmer Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Certificate ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Farm Info
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date Issued
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredCertificates.map((cert, index) => (
                      <motion.tr
                        key={cert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {cert.farmerName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {cert.farmerId}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono text-blue-600 dark:text-blue-400">
                            {cert.certificateId}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {cert.qrCode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {cert.cropType}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {cert.landArea} • {cert.treesPlanted}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(cert.dateIssued).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                            cert.status === 'active'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          }`}>
                            {cert.status === 'active' ? (
                              <CheckCircle size={14} />
                            ) : (
                              <XCircle size={14} />
                            )}
                            <span className="capitalize">{cert.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewCertificate(cert.certificateId)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                              title="View Certificate"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDownloadCertificate(cert)}
                              disabled={downloadingCert === cert.id}
                              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors disabled:opacity-50"
                              title="Download Certificate"
                            >
                              {downloadingCert === cert.id ? (
                                <Loader size={16} className="animate-spin" />
                              ) : (
                                <Download size={16} />
                              )}
                            </button>
                            {cert.status === 'active' && (
                              <button
                                onClick={() => handleRevokeCertificate(cert.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                title="Revoke Certificate"
                              >
                                <XCircle size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-8 text-center text-white shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to verify more farmers?</h3>
            <p className="text-blue-100 mb-6">
              Create new certificates for farmers who have completed sustainable farming practices
            </p>
            <button
              onClick={() => navigate('/officials/certificate-form')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <Plus size={20} />
              <span>Create New Certificate</span>
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OfficialsDashboard;