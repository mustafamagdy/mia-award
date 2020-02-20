import React from "react";

export default ({ name, msg , ...props }) => (
  <label id={`${name}-error`} className="has-error" htmlFor={name}>
    {msg}
  </label>
);
