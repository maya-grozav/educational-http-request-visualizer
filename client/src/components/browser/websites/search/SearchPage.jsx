import SearchResult from "./SearchResult.jsx";
import AccountPage from "../../account/AccountPage.jsx";
import LoginPage from "../../account/LoginPage.jsx";
import RegisterPage from "../../account/RegisterPage.jsx";
import UpgradePage from "../../account/UpgradePage.jsx";
import UpgradeSuccessfulPage from "../../account/UpgradeSuccessfulPage.jsx"
import UpgradeCancelledPage from "../../account/UpgradeCancelledPage.jsx"
import SearchHome from "./SearchHome.jsx"

const SearchPage = ({ url }) => {
  
  let searchedText = "";
  let isSearch = false;
  
  const urlObj = new URL(url);
  
  const pathname = urlObj.pathname;
  const query = urlObj.searchParams.get("q");
  
  if (query) {
    searchedText = query;
    isSearch = true;
  }
  
  const pageFlags = {
    isAccount: pathname === "/account",
    isLogin: pathname === "/login",
    isRegister: pathname === "/register",
    isInfoUpgrade: pathname === "/info-upgrade",
    isUpgradeSuccessful: pathname === "/upgrade-successful",
    isUpgradeFailed: pathname === "/upgrade-canceled",
  };

  return (
    <div className="w-full h-[80vh] dark:bg-gray-900 dark:text-gray-100 flex flex-col">
      {isSearch ? (
        <SearchResult searchedText={searchedText} />
      ) : pageFlags.isAccount ? (
        <AccountPage />
      ) : pageFlags.isLogin ? (
        <LoginPage />
      ) : pageFlags.isRegister ? (
        <RegisterPage />
      ) : pageFlags.isInfoUpgrade ? (
        <UpgradePage />
      ) : pageFlags.isUpgradeSuccessful ? (
        <UpgradeSuccessfulPage />
      ) : pageFlags.isUpgradeFailed ? (
        <UpgradeCancelledPage />
      ) : (
        <SearchHome/>
      )}
    </div>
  );
};

export default SearchPage;
