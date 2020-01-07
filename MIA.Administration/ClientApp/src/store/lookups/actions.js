import { createActions } from "Util/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchNews: { args: [], meta: { async: true } }
  },
  {
    prefix: "@app/lookups/"
  }
);
export const ActionTypes = Types;
export default Creators;
