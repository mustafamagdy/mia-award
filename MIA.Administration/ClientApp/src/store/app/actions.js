import { createActions } from "Util/reduxsauce";

const { Types, Creators } = createActions(
  {
    ping: { args: [], meta: { async: true } },
    changeLocale: { args: ["locale"] },
    changeCurrency: { args: ["currency"] },
    changePriceDisplay: { args: ["priceDisplay"] },
    setIsLoading: { args: [] },
    clearIsLoading: { args: [] }
  },
  {
    prefix: "@app/app/"
  }
);

export const ActionTypes = Types;
export default Creators;
