import React from "react";
import { Trans } from "@lingui/macro";

const FormGroup = ({ label, showStar, children, ...props }) => (
  <div className="form-group">
    <label className="form-group__label">
      <Trans id={label}>{label}</Trans>
      {showStar && <span className="form-group__required">*</span>}
    </label>
    <div className="form-group__wrap">{children}</div>
  </div>
);

export default FormGroup;
