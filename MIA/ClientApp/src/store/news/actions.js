import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchCategories: { args: [], meta: { async: true } },
    fetchFeaturedNews : { args: [], meta: { async: true } },
    fetchNews: { args: ["payload"], meta: { async: true } },
    fetchNewsItem: { args: ["payload"], meta: { async: true } },
    postNewsComment: { args: ["payload"], meta: { async: true } },
    clearCommentSuccess: {}
  },
  {
    prefix: "@app/news/"
  }
);

export const ActionTypes = Types;
export default Creators;
