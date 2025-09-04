import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Smartphone, Satellite, Calculator, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  
  const steps = [
    {
      icon: Smartphone,
      title: 'Farmers Input Data',
      description: 'Simple data entry via Website "KissanCarbon" or mobile app - no complex forms or technical knowledge required.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Satellite,
      title: 'Remote Sensing Validation',
      description: 'AI-powered satellite imagery and remote sensing automatically validate field data and measurements.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Calculator,
      title: 'Carbon Credit Calculation',
      description: 'Automated algorithms calculate carbon sequestration and generate precise credit values.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: FileCheck,
      title: 'Registry-Ready Reports',
      description: 'Complete MRV reports automatically generated and formatted for carbon credit registries.',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className={`text-center mb-16 transform transition-all duration-1000 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Four simple steps from field to carbon credits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const { elementRef, isVisible } = useScrollAnimation();
            
            return (
              <div 
                key={index}
                ref={elementRef}
                className={`transform transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className={`relative w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <step.icon size={32} className="text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <span className="text-sm font-bold text-gray-700">{index + 1}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flow Arrows - Desktop Only */}
        <div className="hidden lg:block relative mt-8">
          <svg className="absolute inset-0 w-full h-20" viewBox="0 0 1000 80">
            <path
              d="M 200 40 L 300 40"
              stroke="#22C55E"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="animate-pulse"
            />
            <path
              d="M 450 40 L 550 40"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="animate-pulse"
            />
            <path
              d="M 700 40 L 800 40"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="animate-pulse"
            />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;