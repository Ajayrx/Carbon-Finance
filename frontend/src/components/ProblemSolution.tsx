import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { AlertCircle, TrendingDown, Users, Zap, BarChart3, Smartphone, ArrowRight } from 'lucide-react';

const ProblemSolution = () => {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const problems = [
    {
      icon: AlertCircle,
      title: 'Expensive MRV Systems',
      description: 'Traditional monitoring costs exclude smallholder farmers from carbon markets.'
    },
    {
      icon: TrendingDown,
      title: 'Inconsistent Data Collection',
      description: 'Manual processes lead to unreliable measurements and verification challenges.'
    },
    {
      icon: Users,
      title: 'Smallholders Excluded',
      description: 'Complex protocols and high costs prevent farmer participation in carbon finance.'
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: 'AI-Powered Data Collection',
      description: 'Automated remote sensing and machine learning for accurate, cost-effective monitoring.'
    },
    {
      icon: Smartphone,
      title: 'Farmer-Friendly Protocols',
      description: 'Simple Website integration and mobile apps to be designed in future for rural communities.'
    },
    {
      icon: BarChart3,
      title: 'Automated Reporting',
      description: 'Registry-ready reports generated automatically, reducing administrative burden.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className={`text-center mb-16 transform transition-all duration-1000 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Transforming Carbon Finance
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From complex, expensive systems to simple, automated solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problems */}
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-8 text-center lg:text-left">
              The Problem
            </h3>
            {problems.map((problem, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-4 p-6 bg-red-50 rounded-xl transform transition-all duration-700 delay-${index * 200} ${
                  sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                } dark:bg-red-900/20`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center">
                  <problem.icon size={24} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{problem.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-8 text-center lg:text-left">
              Our Solution
            </h3>
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-4 p-6 bg-green-50 rounded-xl transform transition-all duration-700 delay-${index * 200 + 400} ${
                  sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                } dark:bg-green-900/20`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                  <solution.icon size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{solution.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connecting Arrow */}
        <div className="hidden lg:flex justify-center my-12">
          <ArrowRight size={48} className="text-blue-500 dark:text-blue-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;