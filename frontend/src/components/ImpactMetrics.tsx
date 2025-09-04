import React, { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Users, MapPin, Leaf } from 'lucide-react';

const ImpactMetrics = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [counts, setCounts] = useState({ farmers: 0, hectares: 0, co2: 0 });

  const targetValues = { farmers: 1247, hectares: 5280, co2: 12450 };

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          farmers: Math.floor(targetValues.farmers * progress),
          hectares: Math.floor(targetValues.hectares * progress),
          co2: Math.floor(targetValues.co2 * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounts(targetValues);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const metrics = [
    {
      icon: Users,
      value: counts.farmers.toLocaleString(),
      label: 'Farmers Onboarded',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      value: counts.hectares.toLocaleString(),
      label: 'Hectares Monitored',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Leaf,
      value: `${counts.co2.toLocaleString()}`,
      label: 'CO₂e Reduced (tons)',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-700 dark:via-blue-700 dark:to-purple-700">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={elementRef} className={`transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-gray-100 mb-4">
              Measurable Impact
            </h2>
            <p className="text-lg md:text-xl text-white/90 dark:text-gray-200/90 max-w-2xl mx-auto">
              Real results for real farmers across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className={`text-center p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-700 delay-${index * 200} hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } dark:bg-gray-800`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${metric.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <metric.icon size={32} className="text-white" />
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {metric.value}
                </div>
                
                <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;