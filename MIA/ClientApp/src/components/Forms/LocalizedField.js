import React from "react";
import { Field } from "components/Forms";

const LocalizedDataField = ({
  name,
  transId,
  errors,
  transdDefaultVal,
  touched,
  ...props
}) => (
  <React.Fragment>
    <Field
      transId={transId + "_ar"}
      transdDefaultVal={`${transdDefaultVal} (ar)`}
      hasError={
        errors && errors.ar !== undefined && touched && touched.ar !== undefined
      }
      name={`${name}.ar`}
      {...props}
    />
    <Field
      transId={transId + "_en"}
      transdDefaultVal={`${transdDefaultVal} (en)`}
      hasError={
        errors && errors.en !== undefined && touched && touched.en !== undefined
      }
      name={`${name}.en`}
      {...props}
    />
  </React.Fragment>
);

export default LocalizedDataField;
