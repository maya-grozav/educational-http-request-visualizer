import { useEffect, useState } from "react";
import ArrowBack from "../../../assets/arrow-back.svg?react";
import { useBrowser } from "../../../contexts/BrowserContext";

const BackButton = () => {
  const { goBack, state } = useBrowser();
  const [style, setStyle] = useState();
  const historyPosition = state?.tabs.find(
    (tab) => tab.id === state.activeTabId
  ).historyPosition;
  useEffect(() => {
    if (historyPosition === 0) {
      setStyle("fill-gray-300 dark:fill-gray-600");
    } else {
      setStyle("fill-gray-600 dark:fill-gray-300");
    }
  }, [historyPosition]);
  return (
    <div>
      <ArrowBack onClick={goBack} className={style} />
    </div>
  );
};

export default BackButton;
