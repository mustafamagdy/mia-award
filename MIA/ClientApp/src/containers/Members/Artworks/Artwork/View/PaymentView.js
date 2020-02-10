import React from "react";
import classNames from "classnames";

const PaymentView = ({ details, active, ...props }) => {
  return <div className={classNames("tab_content tab_payment", { active })}>payment view</div>;
};

export default PaymentView;
