import React from "react";
import { Trans } from "@lingui/macro";

const FormGroupWithNoWrap = ({ label, showStar, children, ...props }) => (
  <div className="form-group">
    <span className="form-group__label">
      <Trans id={label}>{label}</Trans>
      {showStar && <span className="form-group__required">*</span>}
    </span>
    {children}
  </div>
);
export default FormGroupWithNoWrap;
