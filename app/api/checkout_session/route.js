import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => Math.round(amount * 100);

const planDetails = {
  basic: {
    name: 'Basic Plan',
    amount: 0, // Free
  },
  pro: {
    name: 'Pro Plan',
    amount: 12, // $10 per month
  },
  premium: {
    name: 'Premium Plan',
    amount: 20, // $20 per month (example)
  },
};

export async function POST(req) {
  try {
    // Ensure that the request body is JSON and parse it
    const { plan } = await req.json();

    // Validate the plan
    const selectedPlan = planDetails[plan];
    if (!selectedPlan) {
      return NextResponse.json(
        { error: { message: "Invalid plan type" } },
        { status: 400 }
      );
    }

    // Create checkout session
    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPlan.name,
            },
            unit_amount: formatAmountForStripe(selectedPlan.amount),
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error('Error creating checkout session:', error); // Added for debugging
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
