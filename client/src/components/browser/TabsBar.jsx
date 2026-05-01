import { useBrowser } from "../../contexts/BrowserContext";
import Tab from "./Tab";

const TabsBar = () => {
  const { state, newTab, closeTab, changeTab } = useBrowser();
  const { tabs } = state;
  return (
    <div className="flex w-full bg-gray-100 dark:bg-gray-700">
      {tabs.map((tab) => (
        <Tab
          title={tab.title}
          key={tab.id}
          isActive={tab.id === state.activeTabId}
          action={() => changeTab(tab.id)}
          closable={true}
          onClose={() => closeTab(tab.id)}
          onClick={() => changeTab(tab.id)}
        />
      ))}
      <Tab title="+" onClick={newTab} />
    </div>
  );
};

export default TabsBar;
