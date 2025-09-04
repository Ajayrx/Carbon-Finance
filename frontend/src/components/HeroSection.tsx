import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-300 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-400 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-400 rounded-full animate-bounce delay-3000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className={`transform transition-all duration-1500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Unlocking{' '}
            <span className="text-green-600 dark:text-green-400">Carbon Finance</span>{' '}
            for{' '}
            <span className="text-blue-600 dark:text-blue-400">Small Farm holder's</span>
          </h1>
        </div>

        <div className={`transform transition-all duration-1500 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Affordable, automated MRV for agroforestry & rice carbon projects. 
            Empowering farmers with simple, scalable solutions.
          </p>
        </div>

        <div className={`transform transition-all duration-1500 delay-600 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button 
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/auth')}
            className="group inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
          >
            <Play size={24} className="group-hover:scale-110 transition-transform" />
            <span>{isAuthenticated ? 'Continue' : 'Get Started'}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-green-500 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;