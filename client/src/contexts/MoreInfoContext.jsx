import { createContext, useContext, useReducer } from "react";

const MoreInfoContext = createContext();

const initialState = {
  selectedCard: null,
};

const moreInfoReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_CARD":
      if (state.selectedCard === action.payload) {
        return {
          ...state,
          selectedCard: null,
        };
      }
      return {
        ...state,
        selectedCard: action.payload,
      };
    default:
      return state;
  }
};

export const MoreInfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moreInfoReducer, initialState);

  const selectCard = (cardId) => {
    dispatch({ type: "SELECT_CARD", payload: cardId });
  };

  const value = { state, selectCard };

  return (
    <MoreInfoContext.Provider value={value}>
      {children}
    </MoreInfoContext.Provider>
  );
};

export const useMoreInfo = () => {
  return useContext(MoreInfoContext);
};
