import React from "react";
import { ErrorMessage } from "../Forms";

const FieldFilUplpad = ({
  form: { setFieldValue },
  field: { name, hasError },
  ...props
}) => {
  return (
    <>
      <input
        id={name}
        name={name}
        type="file"
        onChange={(event) => {
          setFieldValue(name, event.currentTarget.files[0]);
        }}
      />
      <ErrorMessage name={name} hasError={hasError} />
    </>
  );
};

export default FieldFilUplpad;
