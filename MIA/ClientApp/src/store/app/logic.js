import { ActionTypes } from "./actions";
import logic from "utils/genLogic";

const apiNamespace = "app";
const pingLogic = logic(apiNamespace, ActionTypes.PING);

export default [pingLogic];
