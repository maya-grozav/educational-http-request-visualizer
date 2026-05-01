import UpgradeButton from "./UpgradeButton.jsx";

const UpgradePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 space-y-10">
        <h1 className="text-4xl font-bold text-center">
          Upgrade to <span className="text-indigo-400">Pro</span>
        </h1>

        <p className="text-center text-gray-400 text-lg">
          Unlock the full power of the platform and work without limits.
        </p>

        <div className="grid gap-4 text-gray-300">
          <Feature text="Unlimited access to all premium tools" />
          <Feature text="Faster performance and priority processing" />
          <Feature text="Early access to new features" />
          <Feature text="Priority support" />
        </div>

        <div className="pt-6">
          <UpgradeButton large />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-green-400 text-xl">✓</span>
      <span>{text}</span>
    </div>
  );
};

export default UpgradePage;
