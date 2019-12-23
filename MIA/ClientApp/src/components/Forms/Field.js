import React from "react";
import { Field } from "formik";

const FormField = ({ name, hasError, svgIconHref, ...props }) => (
  <React.Fragment>
    {svgIconHref && (
      <div className="form-group__icon">
        <svg width="27" height="26">
          <use href={`#${svgIconHref}`} />
        </svg>
      </div>
    )}
    <Field name={name} {...props} className={`form-group__input${hasError ? " has-error" : ""}`} />
  </React.Fragment>
);

export default FormField;
