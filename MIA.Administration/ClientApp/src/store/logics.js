import appLogic from "./app/logic";
import authLogic from "./auth/logic";
import lookupsLogic from "./lookups/logic";
// import accountsLogic from "./accounts/logic";
// import etcLogic from "./etc/logic";

export default [
  ...appLogic,
  ...authLogic,
  ...lookupsLogic
  // ...accountsLogic,
  // ...etcLogic,
];
