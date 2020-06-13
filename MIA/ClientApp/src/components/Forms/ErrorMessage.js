import React from "react";
import { ErrorMessage } from "formik";
import { Trans } from "@lingui/react";
// import { ErrorMessage as FErrorMessage } from "formik";

export default ({ name, isFile, hasError, error, ...props }) => {
  return !!isFile ? (
    hasError ? (
      <label id={`${name}-error`} className="has-error" htmlFor={name}>
        <Trans id={error}>{error}</Trans>
      </label>
    ) : null
  ) : (
    <ErrorMessage
      {...props}
      name={name}
      hasError={hasError}
      render={(msg) => {
        return (
          hasError && (
            <label id={`${name}-error`} className="has-error" htmlFor={name}>
              <Trans id={msg}>{msg}</Trans>
            </label>
          )
        );
      }}
    />
  );
};

// export default ErrorMessage;
