export interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string; // Stripe price ID
  features: string[];
  conversationLimit: number | null; // null = unlimited
  popular?: boolean;
}

export interface UserSubscription {
  userId: string;
  subscriptionId: string;
  priceId: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  conversationsUsed: number;
  conversationLimit: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with Forest Lin AI',
    price: 0,
    priceId: 'free',
    conversationLimit: 10,
    features: [
      '10 conversations per month',
      'Basic AI responses',
      'Email support',
      'Forest Lin expertise'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Perfect for regular users',
    price: 9.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID || '',
    conversationLimit: 100,
    popular: true,
    features: [
      '100 conversations per month',
      'Priority AI responses',
      'Conversation history',
      'Email support',
      'Forest Lin expertise'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Unlimited access to Forest Lin AI',
    price: 19.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || '',
    conversationLimit: null, // unlimited
    features: [
      'Unlimited conversations',
      'Fastest AI responses',
      'Full conversation history',
      'Priority support',
      'Advanced insights',
      'Forest Lin expertise'
    ]
  }
];