import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Join us in{' '}
          <span className="text-green-600">scalable MRV</span>{' '}
          for India's farmers
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed">
          Be part of the revolution that's making carbon finance accessible to every small farmer. 
          Together, we can scale climate action and create sustainable livelihoods.
        </p>

        {/* Primary CTA */}
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="group inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
          >
            <Play size={24} className="group-hover:scale-110 transition-transform" />
            <span>Go to Dashboard</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-2xl font-bold text-green-600 mb-2">🌱</div>
            <h4 className="text-gray-900 font-semibold mb-2">Farmer-First Design</h4>
            <p className="text-gray-500 text-sm">Built with and for farming communities</p>
          </div>
          <div className="p-6">
            <div className="text-2xl font-bold text-blue-600 mb-2">📡</div>
            <h4 className="text-gray-900 font-semibold mb-2">Cutting-Edge Tech</h4>
            <p className="text-gray-500 text-sm">AI and remote sensing at scale</p>
          </div>
          <div className="p-6">
            <div className="text-2xl font-bold text-purple-600 mb-2">🌍</div>
            <h4 className="text-gray-900 font-semibold mb-2">Global Impact</h4>
            <p className="text-gray-500 text-sm">Scalable to millions of farmers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
