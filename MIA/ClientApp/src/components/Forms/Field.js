import React from "react";
import { Field } from "formik";
import classNames from "classnames";
import { Trans, t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { ErrorMessage } from "components/Forms";
import FieldFileUpload from "./FieldFileUpload";

const FormField = ({
  name,
  hasError,
  svgIconHref,
  className,
  transId,
  transdDefaultVal,
  showStar,
  isDate,
  placeholder,
  placeholderKey,
  isCheckbox,
  isFile,

  ...props
}) => {
  const isOtherTypes = isCheckbox || isFile;

  return (
    <I18n>
      {({ i18n }) =>
        isOtherTypes === true ? (
          isCheckbox ? (
            <Field name={name} {...props} />
          ) : isFile ? (
            <Field component={FieldFileUpload} name={name} {...props} />
          ) : undefined
        ) : (
          <div className="form-group">
            <label className="form-group__label" htmlFor={name}>
              <Trans id={transId}> {transdDefaultVal} </Trans>
            </label>
            {showStar && <span className="form-group__required">*</span>}
            <div className="form-group__wrap">
              <React.Fragment>
                {svgIconHref && (
                  <div className="form-group__icon">
                    <svg width="27" height="26">
                      <use href={`#${svgIconHref}`} />
                    </svg>
                  </div>
                )}
                {isDate === true ? (
                  <Field name={name} {...props} />
                ) : (
                  <Field
                    name={name}
                    {...props}
                    className={classNames(className || "form-group__input", {
                      " has-error": hasError,
                    })}
                    placeholder={
                      placeholderKey
                        ? i18n._(placeholderKey)
                        : placeholder
                        ? placeholder
                        : ""
                    }
                  />
                )}
              </React.Fragment>
              <ErrorMessage name={name} hasError={hasError} />
            </div>
          </div>
        )
      }
    </I18n>
  );
};

export default FormField;
