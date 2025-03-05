import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '../../Utils/Utils';
import { Navigate } from 'react-router-dom';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pricing plans from the backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(SummaryApi.pricing.url);
        setPlans(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mt-16 mb-16 w-full bg-white">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Pricing Plans
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
            Choose a plan that fits your needs and streamline your complaint management process.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300"
            >
              <div>
                <h3 className="text-2xl font-bold text-center">{plan.title}</h3>
                <div className="mt-4 text-center text-zinc-black dark:text-zinc-850">
                  <span className="text-4xl font-bold">₹ {plan.price}</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handlePayment(plan.id)}
                  className="rounded-md bg-black px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CheckIcon Component
function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default Pricing;