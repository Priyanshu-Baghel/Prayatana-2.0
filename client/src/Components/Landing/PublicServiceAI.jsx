import React from 'react';
import { ShieldCheck, Clock, PhoneCall, Layers } from "lucide-react";
import Feature from './Features';

const PublicServiceAI = () => {

return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-black">
            AI-Powered Complaint System
          </p>
        </div>
        <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Smart Public Services Complaint & Routing
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          A seamless AI-driven system for lodging complaints, tracking progress, and ensuring swift redressal across departments.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
        <Feature icon={ShieldCheck} title="Secure & Transparent" description="AI ensures complaint tracking with transparency and security." />
        <Feature icon={Clock} title="Quick Issue Resolution" description="Automated routing speeds up complaint handling and resolution." />
        <Feature icon={PhoneCall} title="24/7 AI Assistance" description="Round-the-clock AI-powered support for all public service issues." />
        <Feature icon={Layers} title="Department-Wise Routing" description="Intelligent categorization ensures complaints reach the right department." />
      </div>
    </div>
  );
}

export default PublicServiceAI;