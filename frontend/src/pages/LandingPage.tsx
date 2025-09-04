import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import StorytellingSection from '../components/StorytellingSection';
import ProblemSolution from '../components/ProblemSolution';
import HowItWorks from '../components/HowItWorks';
import ImpactMetrics from '../components/ImpactMetrics';
import CallToAction from '../components/CallToAction';

const LandingPage = () => {
  return (
    <>
      <Navigation/>
      <main>
        <HeroSection />
        <StorytellingSection />
        <ProblemSolution />
        <HowItWorks />
        <ImpactMetrics />
        <CallToAction />
      </main>
    </>
  );
};

export default LandingPage;