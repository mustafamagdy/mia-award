import apisauce from "apisauce";
import config from "../constants";

import appApi from "./app";
import accountsApi from "./accounts";
import authApi from "./auth";
import lookupsApi from "./lookups";
import membersApi from "./members";
import boothApi from "./booth";

const apiURI = config.useLocalApi ? config.devApiRoot : config.apiRoot;
const create = (baseURL = apiURI) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache"
    },
    timeout: 30000 //30 sec
  });

  //add access token on each request
  api.addAsyncRequestTransform(request => async () => {
    const token = sessionStorage.getItem("jwtToken");
    const culture = sessionStorage.getItem("culture");
    const cultureCode = sessionStorage.getItem("cultureCode");
    const userIp = sessionStorage.getItem("userIp");

    request.headers["culture"] = culture || "en";
    request.headers["cultureCode"] = cultureCode || "en-US";
    request.headers["userIp"] = userIp || "";

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete request.headers["Authorization"];
    }
  });

  const app = appApi(api);
  const accounts = accountsApi(api);
  const auth = authApi(api);
  const lookups = lookupsApi(api);
  const members = membersApi(api);
  const booth = boothApi(api);

  return {
    setHeader: api.setHeader,
    setHeaders: api.setHeaders,
    ...app,
    ...accounts,
    ...auth,
    ...lookups,
    ...members,
    ...booth
  };
};

export default { create };
