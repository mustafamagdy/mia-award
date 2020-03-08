import React from "react";
import classNames from "classnames";

const PaymentView = ({ details, active, ...props }) => {
  return  <div className="payment_info">
  <ul>
    <li><span>Amount :</span><p>{details?.amount}</p></li>
    <li><span>Date :</span><p>{details?.date}</p></li>
    <li><span>Is Offline :</span><p>{details?.isOffline}</p></li>
    <li><span>Status :</span><p>{details?.status}</p></li>
  </ul>
</div>;
};

export default PaymentView;
