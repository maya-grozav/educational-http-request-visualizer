import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browser from "./components/browser/Browser";
import InfoPanel from "./components/info/InfoPanel";
import MoreInfoPanel from "./components/info/MoreInfoPanel";

import BillingSuccessBridge from "./components/browser/account/BillingSuccessBridge.jsx";
import BillingCanceledBridge from "./components/browser/account/BillingCanceledBridge.jsx";

import { BrowserProvider } from "./contexts/BrowserContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BrowserProvider>
          <Routes>
            <Route path="/billing/success" element={<BillingSuccessBridge />} />
            <Route
              path="/billing/canceled"
              element={<BillingCanceledBridge />}
            />

            <Route
              path="*"
              element={
                <div className="flex flex-col justify-center items-center-safe min-h-screen w-full p-5 gap-5">
                  <div className="flex w-full-safe flex-wrap justify-center items-center-safe gap-5">
                    <Browser />
                    <InfoPanel />
                  </div>
                  <MoreInfoPanel />
                </div>
              }
            />
          </Routes>
        </BrowserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
