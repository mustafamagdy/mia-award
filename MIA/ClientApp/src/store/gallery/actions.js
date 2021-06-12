import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchFeaturedItems: { args: ["payload"], meta: { async: true } },
    fetchItems : { args: ["payload"], meta: { async: true } },
  },
  {
    prefix: "@app/gallery/"
  }
);

export const ActionTypes = Types;
export default Creators;
