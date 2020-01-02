import appLogic from "./app/logic";
import authLogic from "./auth/logic";
import accountsLogic from "./accounts/logic";
import homeLogic from "./home/logic";

export default [
  ...appLogic,
  ...authLogic,
  ...accountsLogic,
  ...homeLogic
];
