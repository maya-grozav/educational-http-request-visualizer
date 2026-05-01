import React from "react";
import WebsiteShortcut from "./WebsiteShortcut";
import { useBrowser } from "../../contexts/BrowserContext";

const HomePage = () => {
  const { navigate } = useBrowser();

  return (
    <div className="h-[80vh] w-full flex justify-center flex-col items-center bg-white dark:bg-gray-900">
      <div className="dark:text-gray-300 gap-5 flex flex-col">
        New here?
        <div className="flex gap-8 px-8">
          <WebsiteShortcut
            url={"WebWiki"}
            onClick={() => navigate("http://webwiki.com/home")}
          />
          <WebsiteShortcut
            url={"WebPeek"}
            onClick={() => navigate("https://webpeek.com/")}
          />
          <WebsiteShortcut
            url={"UserManual"}
            onClick={() => navigate("browser://user-manual")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
