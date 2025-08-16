import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, userEmail } = await request.json();

    if (!priceId || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Construct proper URLs
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    const protocol = origin?.includes('https') ? 'https' : 'http';
    const baseUrl = origin || `${protocol}://${host}`;

    console.log('Origin:', origin);
    console.log('Host:', host); 
    console.log('Base URL:', baseUrl);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      metadata: {
        userId: userId,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    console.error('Error message:', error.message);
    console.error('Error type:', error.type);
    return NextResponse.json(
      { error: `Failed to create checkout session: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}