import apisauce from "apisauce";
import config from "../config";

import appApi from "./app";
import accountsApi from "./accounts";
import authApi from "./auth";
import homeApi from "./home";
import lookupsApi from "./lookups";
import newsApi from "./news";
import galleryApi from "./gallery";
import showsApi from "./shows";
import membersApi from "./members";
import { history } from "store";

const apiURI = config.useLocalApi ? config.devApiRoot : config.apiRoot;
const create = (baseURL = apiURI) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
    },
    timeout: 120000, //30000 //30 sec
  });

  //add access token on each request
  api.addAsyncRequestTransform((request) => async () => {
    const token = localStorage.getItem("jwtToken");
    const culture = localStorage.getItem("culture");
    const cultureCode = localStorage.getItem("cultureCode");
    const userIp = localStorage.getItem("userIp");

    request.headers["culture"] = culture || "en";
    request.headers["cultureCode"] = cultureCode || "en-US";
    request.headers["userIp"] = userIp || "";

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete request.headers["Authorization"];
    }
  });
  api.addResponseTransform((response) => {
    if (
      response.status &&
      (response.status === 401 || response.status === 403)
    ) {
      localStorage.removeItem("jwtToken");
      if (
        response.config.url &&
        response.config.url.toLowerCase() == "auth/login-nominee"
      ) {
        //do nothing
      } else {
        history.push("/");
      }
    }
  });
  const app = appApi(api);
  const accounts = accountsApi(api);
  const auth = authApi(api);
  const home = homeApi(api);
  const lookups = lookupsApi(api);
  const news = newsApi(api);
  const gallery = galleryApi(api);
  const shows = showsApi(api);
  const members = membersApi(api);

  return {
    setHeader: api.setHeader,
    setHeaders: api.setHeaders,
    ...app,
    ...accounts,
    ...auth,
    ...home,
    ...lookups,
    ...news,
    ...gallery,
    ...shows,
    ...members,
  };
};

export default { create };
