import React from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";

const PaymentView = ({ details, active, ...props }) => {
  return (
    <div className={classNames("tab_content tab_payment payment_info", { active })}>
      <ul>
        <li>
          <span>
            <Trans id="amount">Amount </Trans>:
          </span>
          <p>{details?.amount}</p>
        </li>
        <li>
          <span>
            <Trans id="date">Date </Trans>:
          </span>
          <p>{details?.date}</p>
        </li>
        <li>
          <span>
            <Trans id="status">Status </Trans>:
          </span>
          <p>{details?.status}</p>
        </li>
      </ul>
    </div>
  );
};

export default PaymentView;
