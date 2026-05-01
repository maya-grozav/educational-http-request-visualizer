import HomePage from "../components/browser/HomePage";
import WikiPage from "../components/browser/websites/wiki/WikiPage";
import PageNotFound from "../components/browser/PageNotFound";
import SearchPage from "../components/browser/websites/search/SearchPage";
import AdminPanel from "../components/admin/AdminPanel";
import LoginPage from "../components/browser/account/LoginPage";
import RegisterPage from "../components/browser/account/RegisterPage";
import UserManual from '../components/browser/manual/UserManual.jsx'

export const siteRegistry = {
  "http://webwiki.com": WikiPage,
  "https://webpeek.com": SearchPage,
  "https://webpeek.com/login": LoginPage,
  "https://webpeek.com/register": RegisterPage,
  "browser://home": HomePage,
  "browser://admin-panel": AdminPanel,
  "browser://user-manual": UserManual,
};

export const protocolPrefixes = ["http", "https", "wss"]

export const getWebsiteComponent = (url) => {
  if (siteRegistry[url]) return siteRegistry[url];

  const domain = Object.keys(siteRegistry).find(
    (key) => key !== "browser://home" && url.startsWith(key)
  );

  return domain ? siteRegistry[domain] : PageNotFound;
};

export const isValidProtocolPrefix = (prefix) => {
  return protocolPrefixes.find(prefix);
}

export const isValidWebsite = (text) => {
  return Object.keys(siteRegistry).includes(text);
}
