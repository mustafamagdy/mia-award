import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { DIRECTIONS } from "react-with-direction/dist/DirectionProvider";
import { DEFAULT_LOCALE, DEFAULT_DIRECTION, getLocaleDirection, DEFAULT_CURRENCY } from "../constants";
import { ActionTypes } from "./actions";
import SupportedCurrencies from "../SupportedCurrencies";
import SupportedLocales from "../SupportedLocales";

const initialState = {
  supportedLocales: SupportedLocales,
  locale: SupportedLocales[DEFAULT_LOCALE],
  direction: DEFAULT_DIRECTION,
  lastPing: "",
  isLoadingHotels: false
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
});
