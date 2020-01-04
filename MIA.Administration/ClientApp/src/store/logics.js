import appLogic from "./app/logic";
import authLogic from "./auth/logic";
// import accountsLogic from "./accounts/logic";
// import etcLogic from "./etc/logic";

export default [
  ...appLogic,
  ...authLogic,
  // ...accountsLogic,
  // ...etcLogic,
];
