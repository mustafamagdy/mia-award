import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchCategories: { args: [], meta: { async: true } },
    fetchNews: { args: ["payload"], meta: { async: true } }
  },
  {
    prefix: "@app/news/"
  }
);

export const ActionTypes = Types;
export default Creators;
