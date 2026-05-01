import { useEffect } from "react";
import { useBrowser } from "../../../contexts/BrowserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function BillingCanceledBridge() {
  const { navigate: virtualNavigate } = useBrowser();
  const realNavigate = useNavigate();

  useEffect(() => {
    realNavigate("/", { replace: true });
    virtualNavigate("https://webpeek.com/upgrade-canceled");
  }, []);

  return null;
}
