import { createReducer } from "Util/reduxsauce";
import produce from "immer";
import { DIRECTIONS } from "react-with-direction/dist/DirectionProvider";
import { DEFAULT_LOCALE, DEFAULT_DIRECTION, getLocaleDirection } from "Constants";
import { ActionTypes } from "./actions";
import SupportedLocales from "../SupportedLocales";
import AppConfig from "Constants";
import navLinks from "Components/Sidebar/NavLinks";

const initialState = {
  supportedLocales: SupportedLocales,
  locale: SupportedLocales[DEFAULT_LOCALE],
  direction: DEFAULT_DIRECTION,
  lastPing: "",
  navCollapsed: AppConfig.navCollapsed,
  darkMode: AppConfig.darkMode,
  boxLayout: AppConfig.boxLayout,
  isRtlLayout: AppConfig.rtlLayout,
  miniSidebar: AppConfig.miniSidebar,
  searchFormOpen: false, // search form by default false
  isUserTourStarted: false,
  isDarkSidenav: AppConfig.isDarkSidenav,
  themes: [
    {
      id: 1,
      name: "primary"
    },
    {
      id: 2,
      name: "secondary"
    },
    {
      id: 3,
      name: "warning"
    },
    {
      id: 4,
      name: "info"
    },
    {
      id: 5,
      name: "danger"
    },
    {
      id: 6,
      name: "success"
    }
  ],
  activeTheme: {
    id: 1,
    name: "primary"
  },
  // sidebar background image
  sidebarBackgroundImages: [
    require("Assets/img/sidebar-1.jpg"),
    require("Assets/img/sidebar-2.jpg"),
    require("Assets/img/sidebar-3.jpg"),
    require("Assets/img/sidebar-4.jpg")
  ],
  enableSidebarBackgroundImage: AppConfig.enableSidebarBackgroundImage, // default enable sidebar background
  selectedSidebarImage: AppConfig.sidebarImage, // default sidebar background image
  languages: Object.values(SupportedLocales),
  sidebarMenus: navLinks
};

const changeLocale = (state, { locale }) => {
  return produce(state, draft => {
    let _locale = SupportedLocales[locale];
    if (!_locale) _locale = SupportedLocales[DEFAULT_LOCALE];

    draft.locale = _locale;
    draft.direction = _locale.direction.toLowerCase() === "rtl" ? DIRECTIONS.RTL : DIRECTIONS.LTR;
    draft.isRtlLayout = _locale.direction.toLowerCase() === "rtl";
    sessionStorage.setItem("culture", _locale.code);
    sessionStorage.setItem("language", _locale.code);
    sessionStorage.setItem("cultureCode", _locale.culture);
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

const CollapseSidebar = (state, action) => {
  return produce(state, draft => {
    draft.navCollapsed = action.isCollapsed;
  });
};

const DarkMode = (state, action) => {
  return produce(state, draft => {
    draft.darkMode = action.payload;
  });
};

const ToggleMenu = (state, action) => {
  return produce(state, draft => {
    let index = state.sidebarMenus[action.selectedMenu.stateCategory].indexOf(action.selectedMenu.menu);
    const open = action.selectedMenu.menu.open === undefined ? true : action.selectedMenu.menu.open;

    for (var key in state.sidebarMenus) {
      var obj = state.sidebarMenus[key];
      for (let i = 0; i < obj.length; i++) {
        const element = obj[i];
        console.log("element ", element, element.open);
        if (element.open) {
          if (key === action.selectedMenu.stateCategory) {
            draft.sidebarMenus[key][i].open = false;
            draft.sidebarMenus[key][index].open = !open;
          } else {
            draft.sidebarMenus[key][i].open = false;
            draft.sidebarMenus[action.selectedMenu.stateCategory][index].open = !open;
          }
        }
      }
    }
    console.log("open this ", state.sidebarMenus[action.selectedMenu.stateCategory][index], open);
    draft.sidebarMenus[action.selectedMenu.stateCategory][index].open = open;
  });
};

const MiniSidebar = (state, action) => {
  return produce(state, draft => {
    //draft..
  });
};
const SearchFormEnable = (state, action) => {
  return produce(state, draft => {
    //draft..
  });
};
const SetLanguage = (state, action) => {
  return produce(state, draft => {
    //draft..
  });
};
const StartUserTour = (state, action) => {
  return produce(state, draft => {
    draft.isUserTourStarted = true;
  });
};
const StopUserTour = (state, action) => {
  return produce(state, draft => {
    draft.isUserTourStarted = false;
  });
};
const ToggleDarkSidenav = (state, action) => {
  return produce(state, draft => {
    //draft..
  });
};

const rtlLayout = (state, action) => {
  return produce(state, draft => {
    draft.isRtlLayout = action.isRtlLayout;
  });
};

export const reducer = createReducer(initialState, {
  [ActionTypes.PING_SUCCESS]: ping,
  [ActionTypes.SET_IS_LOADING]: setIsLoading,
  [ActionTypes.CLEAR_IS_LOADING]: clearIsLoading,
  [ActionTypes.CHANGE_LOCALE]: changeLocale,
  [ActionTypes.COLLAPSE_SIDEBAR]: CollapseSidebar,
  [ActionTypes.DARK_MODE]: DarkMode,
  [ActionTypes.TOGGLE_MENU]: ToggleMenu,
  [ActionTypes.MINI_SIDEBAR]: MiniSidebar,
  [ActionTypes.SEARCH_FORM_ENABLE]: SearchFormEnable,
  [ActionTypes.SET_LANGUAGE]: SetLanguage,
  [ActionTypes.START_USER_TOUR]: StartUserTour,
  [ActionTypes.STOP_USER_TOUR]: StopUserTour,
  [ActionTypes.TOGGLE_DARK_SIDENAV]: ToggleDarkSidenav,
  [ActionTypes.RTL_LAYOUT]: rtlLayout
});
