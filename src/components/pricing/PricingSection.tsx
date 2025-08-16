'use client'

import { useState } from 'react';
import { SUBSCRIPTION_TIERS } from '@/types/subscription';
import PricingCard from './PricingCard';
import { useAuth } from '@/contexts/AuthContext';

export default function PricingSection() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSelectPlan = async (priceId: string) => {
    if (!user) {
      alert('Please sign in to subscribe');
      return;
    }

    setLoading(true);
    try {
      // Call Stripe checkout
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
          userEmail: user.email,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        console.error('Error creating checkout session:', error);
        alert('Failed to start checkout process. Please try again.');
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await import('@/lib/stripe').then(m => m.stripePromise);
      const stripeInstance = await stripe;
      
      if (stripeInstance) {
        const { error } = await stripeInstance.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.error('Stripe redirect error:', error);
          alert('Failed to redirect to checkout. Please try again.');
        }
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      console.error('Error details:', error.message || error);
      alert(`An error occurred: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get access to Forest Lin&apos;s expertise with flexible pricing options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              onSelectPlan={handleSelectPlan}
              loading={loading}
            />
          ))}
        </div>

        {!user && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Sign in to subscribe to a plan and start chatting with Forest Lin AI
            </p>
          </div>
        )}
      </div>
    </section>
  );
}