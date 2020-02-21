import appLogic from "./app/logic";
import authLogic from "./auth/logic";
import accountsLogic from "./accounts/logic";
import homeLogic from "./home/logic";
import newsLogic from "./news/logic";
import galleryLogic from "./gallery/logic";
import membersLogic from "./members/logic";

export default [...appLogic, ...authLogic, ...accountsLogic, ...homeLogic, ...newsLogic, ...galleryLogic, ...membersLogic];
