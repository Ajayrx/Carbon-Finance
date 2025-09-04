import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../components/Navigation';
import {
  Leaf,
  Upload,
  BarChart3,
  FileText,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Coins,
  Shield,
  History,
} from 'lucide-react';

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, carbonBalance } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: BarChart3, label: 'Overview', path: '/dashboard' },
    { icon: Upload, label: 'Upload Data', path: '/upload' },
    { icon: FileText, label: 'Upload Certificate', path: '/certificate-upload' },
    { icon: Coins, label: 'Credits', path: '/credits' },
    { icon: Shield, label: 'Verification', path: '/verification' },
    { icon: History, label: 'History', path: '/history' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderContent = () => {
    if (children) return children;

    return (
      <div className="space-y-8">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Coins size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Credits</h3>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{carbonBalance}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {(carbonBalance * 0.5).toFixed(1)} tons CO₂e sequestered
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Upload size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Uploads</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This season</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Farm Area</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">5.2 ha</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Total monitored</p>
          </div>
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to upload new farm data or check your carbon credit progress?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/upload')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Upload size={20} />
              <span>Upload Farm Data</span>
            </button>
            <button
              onClick={() => navigate('/credits')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Coins size={20} />
              <span>View Credits</span>
            </button>
            <button
              onClick={() => navigate('/verification')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Shield size={20} />
              <span>Verification & Certificates</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Leaf size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  KisanCarbon
                </span>
              </div>
            </div>

            {/* Top Right Controls */}
            <div className="flex items-center space-x-3">
              {/* Dashboard Pill */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2.5 rounded-full flex items-center justify-center min-w-[120px] shadow-lg cursor-pointer"
                onClick={() => navigate('/')}
              >
                <span className="font-semibold">Main</span>
              </motion.div>

              {/* Dashboard Pill */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2.5 rounded-full flex items-center justify-center min-w-[120px] shadow-lg cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <span className="font-semibold">Dashboard</span>
              </motion.div>

              {/* Carbon Balance Pill */}
              {user && (
                <motion.div
                  key={carbonBalance}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2.5 rounded-full flex items-center justify-center min-w-[160px] shadow-lg"
                >
                  <Coins size={18} />
                  <span className="font-semibold ml-2">{carbonBalance} Credits</span>
                </motion.div>
              )}

              {/* User Pill */}
              {user && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-between min-w-[160px] shadow-lg"
                >
                  <span className="font-semibold">{user?.name || user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-2 p-1 rounded hover:bg-white/20 transition-colors"
                  >
                    <LogOut size={18} className="text-white" />
                  </button>
                </motion.div>
              )}

              {/* Dark Mode Pill */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 rounded-full flex items-center justify-center min-w-[80px] shadow-lg cursor-pointer"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          className="fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg md:shadow-none border-r border-gray-200 dark:border-gray-700 md:translate-x-0"
        >
          <div className="p-6 pt-20 md:pt-6">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${location.pathname === item.path
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default Dashboard;
