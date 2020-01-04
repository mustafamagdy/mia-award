import { createReducer } from "Util/reduxsauce";
import produce from "immer";
import { DIRECTIONS } from "react-with-direction/dist/DirectionProvider";
import { DEFAULT_LOCALE, DEFAULT_DIRECTION, getLocaleDirection } from "Constants";
import { ActionTypes } from "./actions";
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
    sessionStorage.setItem("culture", _locale.code);
    sessionStorage.setItem("language", _locale.code);
    sessionStorage.setItem("cultureCode", _locale.culture);
  });
};

const changeCurrency = (state, { currency }) => {
  return produce(state, draft => {
    draft.currency = SupportedCurrencies[currency];
    sessionStorage.setItem("currency", currency);
  });
};

const changePriceDisplay = (state, { priceDisplay }) => {
  return produce(state, draft => {
    draft.priceDisplay = priceDisplay;
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
  [ActionTypes.CHANGE_CURRENCY]: changeCurrency,
  [ActionTypes.CHANGE_PRICE_DISPLAY]: changePriceDisplay
});
