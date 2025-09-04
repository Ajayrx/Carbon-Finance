import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader } from 'lucide-react';

interface FarmLocation {
  id: string;
  lat: number;
  lng: number;
  activity: string;
  date: string;
  credits: number;
}

interface MapViewProps {
  locations: FarmLocation[];
  loading?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ locations, loading = false }) => {
  if (loading) {
    return (
      <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <Loader size={32} className="animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading farm locations...</p>
        </div>
      </div>
    );
  }

  const openInGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-64 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700"
    >
      <div className="h-full flex flex-col">
        {/* Map Header */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <MapPin size={20} className="text-green-600 dark:text-green-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Farm Locations</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({locations.length} {locations.length === 1 ? 'location' : 'locations'})
            </span>
          </div>
        </div>

        {/* Location List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {locations.length === 0 ? (
            <div className="text-center py-8">
              <MapPin size={32} className="text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No farm locations yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Upload photos with GPS data to see locations</p>
            </div>
          ) : (
            locations.map((location) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openInGoogleMaps(location.lat, location.lng)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {location.activity}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(location.date).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <MapPin size={12} className="text-gray-400 dark:text-gray-600" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      +{location.credits}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {locations.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Click any location to view in Google Maps
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MapView;