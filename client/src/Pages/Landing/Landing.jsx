import React from 'react';

import Pricing from '../../Components/Landing/Pricing';
import Testimonial from '../../Components/Landing/Testimonial';
import Faqs from '../../Components/Landing/Faqs';
import Hero from '../../Components/Landing/Hero';
import PublicServiceAI from '../../Components/Landing/PublicServiceAI';

const Landing = () => {
  return (
    <>
        <Hero />
        <PublicServiceAI />/
        <Faqs />
        <Pricing />
        <Testimonial />
    </>
  )
}

export default Landing