import React from "react";
import { ErrorMessage } from "formik";
// import { ErrorMessage as FErrorMessage } from "formik";

export default ({ name, ...props }) => (
  <ErrorMessage
    {...props}
    name={name}
    render={msg => (
      <>
      {
        props.hasError && 
        <label id={`${name}-error`} className="has-error" htmlFor={name}>
        {msg}
        </label>
      }
      </>
    )}
  />
);

// export default ErrorMessage;
