import React, { Activity, useState } from "react";
import AddWikiPage from "./AddWikiPage";
import AddSearchIndex from "./AddSearchIndex";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const availableActions = [
    {
      title: "Wiki",
      component: AddWikiPage,
    },
    {
      title: "Search Index",
      component: AddSearchIndex,
    },
  ];

  return (
    <div className="w-full h-[80vw] bg-gray-100 dark:bg-gray-900 dark:text-gray-100 p-10 overflow-hidden rounded-md">
      <div className="flex w-full bg-gray-800">
        {availableActions.map((act, i) => {
          return (
            <div
              className={
                "p-5 rounded-t-md " +
                (activeTab === i ? "bg-gray-600" : "bg-gray-700")
              }
              key={i}
              onClick={() => setActiveTab(i)}
            >
              {act.title}
            </div>
          );
        })}
      </div>
      <div className="w-full overflow-auto">
        {availableActions.map((act, i) => {
          const Component = act.component;
          return (
            <Activity
              key={act.id}
              mode={i === activeTab ? "visible" : "hidden"}
            >
              <Component />
            </Activity>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPanel;
