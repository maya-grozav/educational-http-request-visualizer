import UpgradeButton from "./UpgradeButton.jsx";
import { useAuth } from "../../../contexts/AuthContext.jsx";

const AccountPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">

        <div>
          <h1 className="text-2xl font-medium">Account</h1>
          <p className="text-sm text-neutral-400">
            Manage your profile and subscription
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-400">Username</span>
            <span>{user?.username}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-400">Email</span>
            <span>{user?.email}</span>
          </div>
        </div>

        <hr className="border-neutral-800" />

        {user?.account_type === "free" ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm">
                Plan: <span className="text-neutral-400">Free</span>
              </p>
              <p className="text-sm text-neutral-400">
                Upgrade to unlock all premium features.
              </p>
            </div>

            <UpgradeButton />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm">
                Plan: <span className="text-green-400">Premium</span>
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AccountPage;
