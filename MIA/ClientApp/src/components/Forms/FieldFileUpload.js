import React from "react";
import { ErrorMessage } from "../Forms";
import { getPropValue } from "utils";

const FieldFilUplpad = ({
  form: { setFieldValue, errors },
  field: { name },
  hasError,
  ...props
}) => {
  console.log(name, hasError, errors, errors[name]);
  return (
    <div className="form-group__wrap  col-6 col-md-6 col-sm-12">
      <input
        id={name}
        name={name}
        type="file"
        onChange={(event) => {
          setFieldValue(name, event.currentTarget.files[0]);
        }}
        {...props}
      />
      <ErrorMessage
        name={name}
        hasError={hasError}
        isFile={true}
        error={getPropValue(errors, name)}
      />
    </div>
  );
};

export default FieldFilUplpad;
