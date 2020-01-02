import React from "react";
import styled from "styled-components";
import { ErrorMessage } from "formik";

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
