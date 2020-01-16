import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    ping: { args: [], meta: { async: true } },
    changeLocale: { args: ["locale"] },
    setIsLoading: { args: [] },
    clearIsLoading: { args: [] },
    toggleSearchForm: { args: [] },
    toggleSidebar: { args: [] }
  },
  {
    prefix: "@app/app/"
  }
);

export const ActionTypes = Types;
export default Creators;
