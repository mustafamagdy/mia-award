import { createActions } from "Util/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchBooth: { args: ["payload"], meta: { async: true } },
    saveBooth: { args: ["payload"], meta: { async: true } },
    updateBooth: { args: ["payload"], meta: { async: true } },
    deleteBooth: { args: ["payload"], meta: { async: true } }
  },
  {
    prefix: "@app/booth/"
  }
);
export const ActionTypes = Types;
export default Creators;
