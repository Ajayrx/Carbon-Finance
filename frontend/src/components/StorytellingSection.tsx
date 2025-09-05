import React, { useRef, useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Leaf, Wheat, DollarSign, Volume2, VolumeX } from 'lucide-react';

const StorytellingSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: step1Ref, isVisible: step1Visible } = useScrollAnimation();
  const { elementRef: step2Ref, isVisible: step2Visible } = useScrollAnimation();
  const { elementRef: step3Ref, isVisible: step3Visible } = useScrollAnimation();
  const { elementRef: videoRef, isVisible: videoVisible } = useScrollAnimation();
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundControl, setShowSoundControl] = useState(false);

  // Handle video autoplay based on visibility
  useEffect(() => {
    if (videoVisible) {
      setShowSoundControl(true);
    } else {
      setShowSoundControl(false);
    }
  }, [videoVisible]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    // For YouTube iframe, we need to reload with different parameters
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      const newSrc = isMuted 
        ? currentSrc.replace('&mute=1', '&mute=0')
        : currentSrc.replace('&mute=0', '&mute=1');
      iframeRef.current.src = newSrc;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className={`text-center mb-16 transform transition-all duration-1000 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Sita's Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            A smallholder farmer's path to carbon finance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-center mb-20">
          {/* Step 1 */}
          <div ref={step1Ref} className={`text-center transform transition-all duration-1000 ${
            step1Visible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'
          }`}>
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Wheat size={48} className="text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Leaf size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Sita grows rice and plants trees
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              In Odisha, Sita practices sustainable farming, combining rice cultivation with tree planting for environmental benefits.
            </p>
          </div>

          {/* Step 2 */}
          <div ref={step2Ref} className={`text-center transform transition-all duration-1000 delay-300 ${
            step2Visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
              <div className="text-white text-4xl font-bold">?</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Carbon credits seem impossible
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Traditional MRV systems are too expensive and complex for smallholder farmers like Sita to access carbon markets.
            </p>
          </div>

          {/* Step 3 */}
          <div ref={step3Ref} className={`text-center transform transition-all duration-1000 delay-600 ${
            step3Visible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'
          }`}>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
              <DollarSign size={48} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Our solution makes it simple
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Now Sita can access carbon finance through automated, affordable MRV that's designed for farmers like her.
            </p>
          </div>
        </div>

        {/* Video Storytelling Block */}
        <div ref={videoRef} className={`transform transition-all duration-1000 ${
          videoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <iframe
                ref={iframeRef}
                className="w-full h-64 md:h-96"
                src={`https://www.youtube.com/embed/Vx8S3dWrZF8?si=ejCRq7arLaN94EBc&autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&playlist=Vx8S3dWrZF8`}
                title="Sita's Carbon Finance Journey"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              
              {/* Sound Control */}
              {showSoundControl && (
                <div className="absolute top-4 right-4">
                  <button
                    onClick={toggleSound}
                    className="bg-black/70 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
              )}
              
              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-white">
                  <h4 className="text-lg md:text-xl font-semibold mb-2">
                    Watch Sita's journey to carbon finance
                  </h4>
                  <p className="text-sm md:text-base text-white/90">
                    See how our MRV solution transforms farming communities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection
