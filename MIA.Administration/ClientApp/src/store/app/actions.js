import { createActions } from "Util/reduxsauce";

const { Types, Creators } = createActions(
  {
    ping: { args: [], meta: { async: true } },
    changeLocale: { args: ["locale"] },
    setIsLoading: { args: [] },
    clearIsLoading: { args: [] },
    collapseSidebar: { args: ["isCollapsed"] },
    darkMode: { args: ["isDarkMode"] },
    toggleMenu: { args: ["selectedMenu"] },
    miniSidebar: { args: ["isMiniSidebar"] },
    searchFormEnable: { args: [] },
    setLanguage: { args: ["language"] },
    startUserTour: { args: [] },
    stopUserTour: { args: [] },
    toggleDarkSidenav: { args: [] },
    rtlLayout: { args: ["isRtlLayout"] },
  },
  {
    prefix: "@app/app/"
  }
);

export const ActionTypes = Types;
export default Creators;
