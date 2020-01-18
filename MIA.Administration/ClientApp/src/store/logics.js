import appLogic from "./app/logic";
import authLogic from "./auth/logic";
import lookupsLogic from "./lookups/logic";
import photoAlbumLogic from "./photoalbum/logic";
import boothLogic from "./booth/logic";
import votingcriteriaLogic from "./votingcriteria/logic";
// import accountsLogic from "./accounts/logic";
// import etcLogic from "./etc/logic";

export default [
  ...appLogic,
  ...authLogic,
  ...lookupsLogic,
  ...boothLogic,
  ...photoAlbumLogic,
  ...votingcriteriaLogic
  // ...accountsLogic,
  // ...etcLogic,
];
