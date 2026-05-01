import { createContext, useContext, useReducer } from "react";

const homePath = "browser://home";

const createTab = (props) => {
  return {
    id: crypto.randomUUID(),
    title: props.title,
    url: props.url,
    history: [props.url],
    historyPosition: 0,
    scrollPosition: 0,
  };
};

const defaultTab = createTab({ url: homePath, title: "New tab" });

const initialState = {
  tabs: [defaultTab],
  activeTabId: defaultTab.id,
  requests: [],
  activeRequestIndex: 0,
  refreshKey: null,
};

const browserReducer = (state, action) => {
  switch (action.type) {
    case "NEW_TAB":
      const linkTab = createTab(action.payload);
      return {
        ...state,
        tabs: [...state.tabs, linkTab],
        activeTabId: linkTab.id,
      };
    case "CLOSE_TAB":
      const tabId = action.payload;
      const filteredTabs = state.tabs.filter((tab) => tab.id !== tabId);

      if (filteredTabs.length === 0) {
        const newTab = createTab(homePath);
        return {
          ...state,
          tabs: [newTab],
          activeTabId: newTab.id,
        };
      }

      let newActiveTabId = state.activeTabId;

      if (state.activeTabId == tabId) {
        const indexToRemove = state.tabs.findIndex((tab) => tab.id === tabId);
        const newIndex = indexToRemove > 0 ? indexToRemove - 1 : 0;

        newActiveTabId = filteredTabs[newIndex].id;
      }

      return {
        ...state,
        tabs: filteredTabs,
        activeTabId: newActiveTabId,
      };

    case "CHANGE_TAB":
      if (state.tabs.find((tab) => tab.id === action.payload)) {
        return {
          ...state,
          activeTabId: action.payload,
        };
      } else {
        return state;
      }
    case "NAVIGATE":
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (tab.id === state.activeTabId) {
            const newHistory = tab.history.slice(0, tab.historyPosition + 1);
            return {
              ...tab,
              url: action.payload,
              history: [...newHistory, action.payload],
              historyPosition: newHistory.length,
            };
          }
          return tab;
        }),
      };
    case "GO_BACK":
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (
            tab.id === state.activeTabId &&
            tab.history.length > 0 &&
            tab.historyPosition > 0
          ) {
            return {
              ...tab,
              url: tab.history[tab.historyPosition - 1],
              historyPosition: tab.historyPosition - 1,
            };
          }
          return tab;
        }),
      };
    case "GO_FORWARD":
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (
            tab.id === state.activeTabId &&
            tab.historyPosition < tab.history.length - 1
          ) {
            return {
              ...tab,
              historyPosition: tab.historyPosition + 1,
              url: tab.history[tab.historyPosition + 1],
            };
          }
          return tab;
        }),
      };
    case "CHANGE_TITLE":
      console.log("CHANGE TITLE", action.payload);
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (tab.id === action.payload.tabId) {
            return {
              ...tab,
              title: action.payload.title,
            };
          }
          return tab;
        }),
      };
    case "ADD_REQUEST": {
      const exists = state.requests.some(
        (r) => r.data?._id === action.payload.data?._id,
      );

      if (exists) return state;
      console.log(action.payload);

      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    }
    case "CHANGE_ACTIVE_REQUEST_INDEX":
      console.log("changing index");
      return {
        ...state,
        activeRequestIndex: action.payload,
      };
    case "REFRESH":
      console.log("refreshed");
      return { ...state, refreshKey: crypto.randomUUID() };
    case "OPEN_SEARCH": {
      const query = String(action.payload).trim().replace(/\s+/g, "+");

      const url = `https://webpeek.com/search?q=${query}`;

      const newTab = createTab({
        title: `Search: ${action.payload}`,
        url,
      });

      return {
        ...state,
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }

    default:
      return state;
  }
};

const BrowserContext = createContext();

export const BrowserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(browserReducer, initialState);

  const openLink = (url) => {
    dispatch({ type: "NEW_TAB", payload: { url: url, title: title } });
  };

  const openSearch = (text) => {
    dispatch({ type: "OPEN_SEARCH", payload: text });
  };

  const changeTab = (tabId) => {
    dispatch({
      type: "CHANGE_TAB",
      payload: tabId,
    });
  };

  const newTab = () => {
    dispatch({ type: "NEW_TAB", payload: { url: homePath, title: "New tab" } });
  };

  const closeTab = (tabId) => {
    dispatch({ type: "CLOSE_TAB", payload: tabId });
  };

  const navigate = (newUrl) => {
    dispatch({ type: "NAVIGATE", payload: newUrl });
  };

  const goBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  const goForward = () => {
    dispatch({ type: "GO_FORWARD" });
  };

  const changeTitle = (newTitle, tabId) => {
    dispatch({
      type: "CHANGE_TITLE",
      payload: { title: newTitle, tabId: tabId },
    });
  };

  const addRequest = (request) => {
    dispatch({
      type: "ADD_REQUEST",
      payload: request,
    });
  };

  const changeActiveRequestIndex = (newIndex) => {
    dispatch({
      type: "CHANGE_ACTIVE_REQUEST_INDEX",
      payload: newIndex,
    });
  };

  const refresh = () => {
    dispatch({ type: "REFRESH" });
  };

  const value = {
    state,
    openLink,
    openSearch,
    changeTab,
    newTab,
    closeTab,
    navigate,
    goBack,
    goForward,
    changeTitle,
    addRequest,
    changeActiveRequestIndex,
    refresh,
  };
  return (
    <BrowserContext.Provider value={value}>{children}</BrowserContext.Provider>
  );
};

export function useBrowser() {
  return useContext(BrowserContext);
}
