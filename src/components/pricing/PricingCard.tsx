'use client'

import { SubscriptionTier } from '@/types/subscription';
import { useAuth } from '@/contexts/AuthContext';

interface PricingCardProps {
  tier: SubscriptionTier;
  onSelectPlan: (priceId: string) => void;
  loading?: boolean;
}

export default function PricingCard({ tier, onSelectPlan, loading }: PricingCardProps) {
  const { user } = useAuth();

  const handleSelectPlan = () => {
    if (tier.id === 'free') {
      // Free tier - no payment needed
      return;
    }
    onSelectPlan(tier.priceId);
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-lg ${tier.popular ? 'ring-2 ring-primary-600' : ''}`}>
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white px-3 py-1 text-sm font-medium rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
        <p className="mt-2 text-gray-600">{tier.description}</p>
        
        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-900">
            ${tier.price}
          </span>
          {tier.price > 0 && (
            <span className="text-gray-600">/month</span>
          )}
        </div>

        <ul className="mt-6 space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSelectPlan}
          disabled={loading || !user || tier.id === 'free'}
          className={`mt-8 w-full py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            tier.popular
              ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
              : 'bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-primary-500'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : tier.id === 'free' ? (
            'Current Plan'
          ) : !user ? (
            'Sign in to Subscribe'
          ) : (
            `Subscribe to ${tier.name}`
          )}
        </button>
      </div>
    </div>
  );
}