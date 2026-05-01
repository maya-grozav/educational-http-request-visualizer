import { api } from "../../../lib/api.js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const UpgradeButton = () => {
  const handleUpgrade = async () => {
    const { data } = await api.post("/billing/create-checkout-session");

    window.location.href = data.url;
  };

  return <button onClick={handleUpgrade}>Upgrade to premium</button>;
};

export default UpgradeButton;
