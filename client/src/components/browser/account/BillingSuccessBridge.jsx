import { useEffect } from "react";
import { useBrowser } from "../../../contexts/BrowserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function BillingSuccessBridge() {
  const { navigate: virtualNavigate } = useBrowser();
  const realNavigate = useNavigate();

  useEffect(() => {
    realNavigate("/", { replace: true });

    virtualNavigate("https://webpeek.com/upgrade-successful");
  }, []);

  return null;
}
