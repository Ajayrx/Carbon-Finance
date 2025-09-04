import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, Award } from 'lucide-react';

interface ProgressTrackerProps {
  currentCredits: number;
  seasonTarget?: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  currentCredits, 
  seasonTarget = 100 
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progressPercentage = Math.min((currentCredits / seasonTarget) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 500);

    return () => clearTimeout(timer);
  }, [progressPercentage]);

  const badges = [
    {
      id: 'first-upload',
      name: 'First Upload',
      description: 'Completed your first farm data upload',
      icon: Trophy,
      earned: currentCredits > 0,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'tree-planter',
      name: 'Tree Planter',
      description: 'Planted and verified 10+ trees',
      icon: Award,
      earned: currentCredits >= 15,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'carbon-champion',
      name: 'Carbon Champion',
      description: 'Earned 50+ carbon credits',
      icon: Target,
      earned: currentCredits >= 50,
      color: 'from-blue-400 to-blue-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Season Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Season Progress</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Credits Earned</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentCredits} / {seasonTarget}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${animatedProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
            />
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-400">
            You've earned <span className="font-semibold text-green-600 dark:text-green-400">
              {Math.round(progressPercentage)}%
            </span> of expected credits this season
          </p>
        </div>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Achievement Badges</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                badge.earned
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  badge.earned 
                    ? `bg-gradient-to-br ${badge.color}` 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  <badge.icon size={24} className="text-white" />
                </div>
                <h4 className={`font-semibold mb-1 ${
                  badge.earned 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {badge.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {badge.description}
                </p>
                {badge.earned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2"
                  >
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      ✓ Earned
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;