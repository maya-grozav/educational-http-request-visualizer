import { useEffect, useState } from "react";
import ArrowForward from "../../../assets/arrow-forward.svg?react";
import { useBrowser } from "../../../contexts/BrowserContext";

const ForwardButton = () => {
  const { goForward, state } = useBrowser();
  const [style, setStyle] = useState();
  const historyPosition = state?.tabs.find(
    (tab) => tab.id === state.activeTabId
  ).historyPosition;
  useEffect(() => {
    if (
      historyPosition ===
      state.tabs.find((tab) => tab.id === state.activeTabId).history.length - 1
    ) {
      setStyle("fill-gray-300 dark:fill-gray-600");
    } else {
      setStyle("fill-gray-600 dark:fill-gray-300");
    }
  }, [historyPosition]);
  return (
    <div>
      <ArrowForward onClick={goForward} className={style}/>
    </div>
  );
};

export default ForwardButton;
