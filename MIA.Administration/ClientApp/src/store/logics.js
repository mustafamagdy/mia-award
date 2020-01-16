import appLogic from "./app/logic";
import authLogic from "./auth/logic";
import lookupsLogic from "./lookups/logic";
import boothLogic from "./booth/logic";
// import accountsLogic from "./accounts/logic";
// import etcLogic from "./etc/logic";

export default [
  ...appLogic,
  ...authLogic,
  ...lookupsLogic,
  ...boothLogic
  // ...accountsLogic,
  // ...etcLogic,
];
