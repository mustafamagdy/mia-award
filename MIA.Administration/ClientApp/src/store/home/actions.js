import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    
  },
  {
    prefix: "@app/home/"
  }
);

export const ActionTypes = Types;
export default Creators;
