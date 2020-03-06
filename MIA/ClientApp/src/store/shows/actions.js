import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchFeaturedItems: { args: ["payload"], meta: { async: true } },
    fetchItems : { args: ["payload"], meta: { async: true } },
    fetchShowDetails : { args: ["payload"], meta: { async: true } },
    postShowReview: { args: ["payload"], meta: { async: true } },
    clearReviewSuccess: {}
  },
  {
    prefix: "@app/shows/"
  }
);

export const ActionTypes = Types;
export default Creators;
