import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { DIRECTIONS } from "react-with-direction/dist/DirectionProvider";
import { DEFAULT_LOCALE, DEFAULT_DIRECTION, DEFAULT_CURRENCY } from "../constants";
import { ActionTypes } from "./actions";
import SupportedLocales from "../SupportedLocales";

const initialState = {
  supportedLocales: SupportedLocales,
  locale: SupportedLocales[DEFAULT_LOCALE],
  direction: DEFAULT_DIRECTION,
  currency: DEFAULT_CURRENCY,
  lastPing: "",
  sidebarOpen: false,
  searchFormOpen: false,
  shareSidebarOpen: false
};

const toggleSidebar = (state, { locale }) => {
  return produce(state, draft => {
    draft.sidebarOpen = !state.sidebarOpen;

    if (draft.sidebarOpen) document.body.classList.add("open_aside");
    else document.body.classList.remove("open_aside");
  });
};

const toggleSearchForm = (state, { locale }) => {
  return produce(state, draft => {
    draft.searchFormOpen = !state.searchFormOpen;

    if (draft.searchFormOpen) document.body.classList.add("open_search_area");
    else document.body.classList.remove("open_search_area");
  });
};

const toggleShareSidebar = (state, { locale }) => {
  return produce(state, draft => {
    draft.shareSidebarOpen = !state.shareSidebarOpen;

    if (draft.shareSidebarOpen) document.body.classList.add("open_share_side");
    else document.body.classList.remove("open_share_side");
  });
};

const changeLocale = (state, { locale }) => {
  return produce(state, draft => {
    let _locale = SupportedLocales[locale];
    if (!_locale) _locale = SupportedLocales[DEFAULT_LOCALE];

    draft.locale = _locale;
    draft.direction = _locale.direction.toLowerCase() === "rtl" ? DIRECTIONS.RTL : DIRECTIONS.LTR;
    localStorage.setItem("culture", _locale.code);
    localStorage.setItem("language", _locale.code);
    localStorage.setItem("cultureCode", _locale.culture);
    
    document.body.setAttribute("dir", draft.direction);
  });
};

const ping = (state, action) => {
  return produce(state, draft => {
    draft.lastPing = action.payload;
  });
};

const setIsLoading = (state, action) => {
  return produce(state, draft => {
    draft.isLoadingHotels = true;
  });
};

const clearIsLoading = (state, action) => {
  return produce(state, draft => {
    draft.isLoadingHotels = false;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.PING_SUCCESS]: ping,
  [ActionTypes.SET_IS_LOADING]: setIsLoading,
  [ActionTypes.CLEAR_IS_LOADING]: clearIsLoading,
  [ActionTypes.CHANGE_LOCALE]: changeLocale,
  [ActionTypes.TOGGLE_SIDEBAR]: toggleSidebar,
  [ActionTypes.TOGGLE_SEARCH_FORM]: toggleSearchForm,
  [ActionTypes.TOGGLE_SHARE_SIDEBAR]: toggleShareSidebar
});
