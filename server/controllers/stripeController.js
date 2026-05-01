import User from "../models/user.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",

    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],

    success_url: `${process.env.APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/billing/canceled`,

    customer_email: user.email,
    metadata: { userId: user.id },
  });

  res.json({ url: session.url });
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log("Webhook error: ", err.message);
    return res.status(400).send("Webhook Error");
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      const userId = session.metadata.userId;

      await User.findByIdAndUpdate(userId, {
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        stripe_subscription_status: "active",
        account_type: "premium",
      });

      console.log("Payment completed. userId: ", userId);
      break;
    }

    case "customer.subscription.deleted": {
      break;
    }
  }

  res.json({ received: true });
};
