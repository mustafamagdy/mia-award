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
      transdDefaultVal={transdDefaultVal}
      hasError={
        errors && errors.ar !== undefined && touched && touched.ar !== undefined
      }
      name={`${name}.ar`}
    />
    <Field
      transId={transId + "_en"}
      transdDefaultVal={transdDefaultVal}
      hasError={
        errors && errors.en !== undefined && touched && touched.en !== undefined
      }
      name={`${name}.en`}
    />
  </React.Fragment>
);

export default LocalizedDataField;
