import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Coins, TrendingUp, Calendar, Leaf, Wheat, Loader } from 'lucide-react';
import MapView from './MapView';
import ProgressTracker from './ProgressTracker';

interface CreditHistory {
  id: string;
  date: string;
  activity: string;
  credits: number;
  type: 'rice' | 'trees' | 'other';
  location?: { lat: number; lng: number; name: string };
}

const CreditsDashboard = () => {
  const { carbonBalance } = useAuth();
  const [credits, setCredits] = useState<CreditHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [animatedBalance, setAnimatedBalance] = useState(0);

  useEffect(() => {
    // Simulate API call
    const fetchCredits = async () => {
      setLoading(true);

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockCredits: CreditHistory[] = [
        {
          id: '1',
          date: '2025-01-15',
          activity: 'Rice field monitoring',
          credits: 10,
          type: 'rice',
          location: { lat: 20.2961, lng: 85.8245, name: 'Bhubaneswar, Odisha' }
        },
        {
          id: '2',
          date: '2025-01-15',
          activity: 'Tree planting verification',
          credits: 15,
          type: 'trees',
          location: { lat: 20.3019, lng: 85.8197, name: 'Khurda, Odisha' }
        },
        {
          id: '3',
          date: '2025-01-10',
          activity: 'Sustainable farming practices',
          credits: 8,
          type: 'other',
          location: { lat: 20.2700, lng: 85.8400, name: 'Puri, Odisha' }
        },
        {
          id: '4',
          date: '2025-01-05',
          activity: 'Agroforestry implementation',
          credits: 12,
          type: 'trees',
          location: { lat: 20.2500, lng: 85.8000, name: 'Cuttack, Odisha' }
        }
      ];

      setCredits(mockCredits);
      setLoading(false);
    };

    fetchCredits();
  }, []);

  // Animate balance counter
  useEffect(() => {
    if (!loading) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setAnimatedBalance(Math.floor(carbonBalance * progress));

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedBalance(carbonBalance);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [loading, carbonBalance]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'rice':
        return <Wheat size={16} className="text-green-600 dark:text-green-400" />;
      case 'trees':
        return <Leaf size={16} className="text-blue-600 dark:text-blue-400" />;
      default:
        return <TrendingUp size={16} className="text-purple-600 dark:text-purple-400" />;
    }
  };

  // Convert credits to farm locations for map
  const farmLocations = credits
    .filter(credit => credit.location)
    .map(credit => ({
      id: credit.id,
      lat: credit.location!.lat,
      lng: credit.location!.lng,
      activity: credit.activity,
      date: credit.date,
      credits: credit.credits
    }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Carbon Credits Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your environmental impact and earned credits
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-4"
      >
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Coins size={24} />
            <h3 className="text-lg font-semibold">Total Credits</h3>
          </div>
          <p className="text-3xl font-bold">{animatedBalance}</p>
          <p className="text-green-100 text-sm mt-2">+25 this month</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp size={24} />
            <h3 className="text-lg font-semibold">This Month</h3>
          </div>
          <p className="text-3xl font-bold">25</p>
          <p className="text-blue-100 text-sm mt-2">Credits earned</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar size={24} />
            <h3 className="text-lg font-semibold">Activities</h3>
          </div>
          <p className="text-3xl font-bold">{credits.length}</p>
          <p className="text-purple-100 text-sm mt-2">Verified submissions</p>
        </div>
      </motion.div>

      {/* Progress Tracker */}
      <ProgressTracker currentCredits={animatedBalance} />

      {/* Farm Locations Map */}
      {farmLocations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Farm Locations</h2>
          <MapView locations={farmLocations} loading={loading} />
        </motion.div>
      )}

      {/* Credits History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Credit History</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Loader size={32} className="animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading your credit history...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Credits Earned
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {credits.map((credit, index) => (
                  <motion.tr
                    key={credit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(credit.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        {getActivityIcon(credit.type)}
                        <span className="text-sm text-gray-900 dark:text-white">
                          {credit.activity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {credit.location?.name || 'Location not available'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        +{credit.credits}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Total Credits Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-xl p-8 text-center text-white shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-4">Total Environmental Impact</h3>
        <div className="text-6xl font-bold mb-2">{animatedBalance}</div>
        <p className="text-xl opacity-90">Carbon Credits Earned</p>
        <p className="text-sm opacity-75 mt-2">
          Equivalent to {(animatedBalance * 0.5).toFixed(1)} tons of CO₂ sequestered
        </p>
      </motion.div>
    </div>
  );
};

export default CreditsDashboard;