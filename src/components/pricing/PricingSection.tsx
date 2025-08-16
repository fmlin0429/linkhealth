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
      console.log('Starting checkout for price:', priceId);
      console.log('User:', { uid: user.uid, email: user.email });
      
      // Call Stripe checkout  
      const response = await fetch('/api/stripe/create-checkout-session?t=' + Date.now(), {
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

      console.log('API Response status:', response.status);
      console.log('API Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }

      const responseData = await response.json();
      console.log('API Response data:', responseData);
      
      const { sessionId, error } = responseData;

      if (error) {
        console.error('Error creating checkout session:', error);
        alert('Failed to start checkout process. Please try again.');
        return;
      }

      // Redirect to Stripe Checkout
      const { loadStripe } = await import('@stripe/stripe-js');
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      
      console.log('Publishable key check:', publishableKey ? 'Available' : 'Missing');
      
      if (!publishableKey) {
        console.error('Stripe publishable key not available');
        alert('Payment system not configured. Please check environment variables.');
        return;
      }
      
      const stripeInstance = await loadStripe(publishableKey);
      
      if (!stripeInstance) {
        console.error('Stripe instance failed to load');
        alert('Payment system not available. Please check your configuration.');
        return;
      }

      const { error: redirectError } = await stripeInstance.redirectToCheckout({
        sessionId,
      });

      if (redirectError) {
        console.error('Stripe redirect error:', redirectError);
        alert('Failed to redirect to checkout. Please try again.');
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