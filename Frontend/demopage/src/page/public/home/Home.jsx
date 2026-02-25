import React from 'react';

import HomeFeature from './HomeFeature';
import HeroSection from './hero';
import CTA from './CTA/CTA';
import StorySection from './ScrollStory';
import WhoItsFor from './WhoItsFor';
import QuesAns from './QuesAns';
import HomeBlogSection from './Blogpreview';
import ContactPreview from './ContactPreview';  


export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhoItsFor />
       <StorySection />
      <HomeFeature />
      <CTA />
       <HomeBlogSection /> 
      <QuesAns />
       <ContactPreview /> 
    </div>
  );
}
