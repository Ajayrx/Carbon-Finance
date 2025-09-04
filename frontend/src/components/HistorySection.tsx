import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Leaf, Wheat, TrendingUp, MapPin, Loader } from 'lucide-react';

interface HistoryEntry {
  id: string;
  date: string;
  activity: string;
  credits: number;
  type: 'rice' | 'trees' | 'other';
  location?: { lat: number; lng: number; name: string };
  photos: number;
  status: 'completed' | 'processing' | 'verified';
}

const HistorySection = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'rice' | 'trees' | 'other'>('all');

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockHistory: HistoryEntry[] = [
        {
          id: '1',
          date: '2025-01-15',
          activity: 'Rice field monitoring - Kharif season',
          credits: 10,
          type: 'rice',
          location: { lat: 20.2961, lng: 85.8245, name: 'Bhubaneswar, Odisha' },
          photos: 5,
          status: 'verified'
        },
        {
          id: '2',
          date: '2025-01-15',
          activity: 'Mango tree plantation verification',
          credits: 15,
          type: 'trees',
          location: { lat: 20.3019, lng: 85.8197, name: 'Khurda, Odisha' },
          photos: 8,
          status: 'completed'
        },
        {
          id: '3',
          date: '2025-01-10',
          activity: 'Organic farming practices documentation',
          credits: 8,
          type: 'other',
          location: { lat: 20.2700, lng: 85.8400, name: 'Puri, Odisha' },
          photos: 3,
          status: 'processing'
        },
        {
          id: '4',
          date: '2025-01-05',
          activity: 'Coconut agroforestry implementation',
          credits: 12,
          type: 'trees',
          location: { lat: 20.2500, lng: 85.8000, name: 'Cuttack, Odisha' },
          photos: 6,
          status: 'verified'
        }
      ];
      
      setHistory(mockHistory);
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(entry => entry.type === filter);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'rice':
        return <Wheat size={20} className="text-green-600 dark:text-green-400" />;
      case 'trees':
        return <Leaf size={20} className="text-blue-600 dark:text-blue-400" />;
      default:
        return <TrendingUp size={20} className="text-purple-600 dark:text-purple-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'processing':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const totalCredits = history.reduce((sum, entry) => sum + entry.credits, 0);
  const totalPhotos = history.reduce((sum, entry) => sum + entry.photos, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Activity History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track all your farming activities and credit earnings
        </p>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-2xl font-bold">{history.length}</div>
          <div className="text-green-100 text-sm">Total Activities</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-2xl font-bold">{totalCredits}</div>
          <div className="text-blue-100 text-sm">Credits Earned</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-2xl font-bold">{totalPhotos}</div>
          <div className="text-purple-100 text-sm">Photos Uploaded</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-2xl font-bold">{history.filter(h => h.status === 'verified').length}</div>
          <div className="text-orange-100 text-sm">Verified Activities</div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1"
      >
        {[
          { key: 'all', label: 'All Activities' },
          { key: 'rice', label: 'Rice Farming' },
          { key: 'trees', label: 'Tree Planting' },
          { key: 'other', label: 'Other' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
              filter === tab.key
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* History Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        {loading ? (
          <div className="p-8 text-center">
            <Loader size={32} className="animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading activity history...</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {filteredHistory.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-green-500 pl-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      {getActivityIcon(entry.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {entry.activity}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        {entry.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{entry.location.name}</span>
                          </div>
                        )}
                        <span>{entry.photos} photos</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(entry.status)}`}>
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        +{entry.credits}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">credits</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HistorySection;