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
  <div>
    <Field
      transId={transId}
      transdDefaultVal={transdDefaultVal}
      hasError={
        errors && errors.ar !== undefined && touched && touched.ar !== undefined
      }
      name={`${name}.ar`}
    />
    <Field
      transId={transId}
      transdDefaultVal={transdDefaultVal}
      hasError={
        errors && errors.en !== undefined && touched && touched.en !== undefined
      }
      name={`${name}.en`}
    />
  </div>
);

export default LocalizedDataField;
