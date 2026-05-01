import { useBrowser } from "../../../contexts/BrowserContext.jsx";

const UpgradeSuccessfulPage = () => {
  const { navigate } = useBrowser();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">

        <div>
          <h1 className="text-2xl font-medium">Payment successful</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Your account has been upgraded to Premium.
          </p>
        </div>

        <hr className="border-neutral-800" />

        <p className="text-sm text-neutral-400">
          You now have access to all premium features.
        </p>

        <button
          onClick={() => navigate("https://webpeek.com/account")}
          className="text-sm text-neutral-300 hover:text-white transition"
        >
          ← Go to account
        </button>

      </div>
    </div>
  );
};

export default UpgradeSuccessfulPage;
