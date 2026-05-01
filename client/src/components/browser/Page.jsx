import React, { Activity } from "react";
import { useBrowser } from "../../contexts/BrowserContext";
import { getWebsiteComponent } from "../../config/siteRegistry";

const Page = () => {
  const { state } = useBrowser();
  const { tabs, activeTabId } = state;
  
  return (
    <div className="w-full border h-full bg-white dark:bg-gray-900">
      {tabs.map((tab) => {
        const PageComponent = getWebsiteComponent(tab.url);

        return (
          <Activity
            key={tab.id}
            mode={tab.id === activeTabId ? "visible" : "hidden"}
          >
            <PageComponent url={tab.url} id={tab.id} />
          </Activity>
        );
      })}
    </div>
  );
};

export default Page;
