import { createActions } from "Util/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchNews: { args: ["payload"], meta: { async: true } },
    saveNews: { args: ["payload"], meta: { async: true } },
    updateNews: { args: ["payload"], meta: { async: true } },
    deleteNews: { args: ["payload"], meta: { async: true } }
  },
  {
    prefix: "@app/lookups/"
  }
);
export const ActionTypes = Types;
export default Creators;
