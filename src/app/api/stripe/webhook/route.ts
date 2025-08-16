import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { UserSubscription } from '@/types/subscription';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        await handleSubscriptionCancellation(deletedSubscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionUpdate(subscription: any) {
  try {
    const userId = subscription.metadata.userId;
    if (!userId) {
      console.error('No userId in subscription metadata');
      return;
    }

    // Get the price ID to determine the plan
    const priceId = subscription.items.data[0].price.id;
    
    // Determine conversation limit based on price
    let conversationLimit = null;
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID) {
      conversationLimit = 100;
    } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID) {
      conversationLimit = null; // unlimited
    }

    const userSubscription: UserSubscription = {
      userId,
      subscriptionId: subscription.id,
      priceId,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      conversationsUsed: 0,
      conversationLimit,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to Firestore
    const subscriptionRef = doc(firestore, 'subscriptions', userId);
    await setDoc(subscriptionRef, userSubscription, { merge: true });

    console.log('Subscription updated for user:', userId);
  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}

async function handleSubscriptionCancellation(subscription: any) {
  try {
    const userId = subscription.metadata.userId;
    if (!userId) {
      console.error('No userId in subscription metadata');
      return;
    }

    // Update subscription status to canceled
    const subscriptionRef = doc(firestore, 'subscriptions', userId);
    await setDoc(subscriptionRef, {
      status: 'canceled',
      updatedAt: new Date(),
    }, { merge: true });

    console.log('Subscription canceled for user:', userId);
  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}