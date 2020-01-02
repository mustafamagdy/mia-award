import React from "react";
const RadiobuttonGroup = ({
  field: { id, name, value: selectedValue, onChange, onBlur },
  form: { setFieldValue },
  options,
  title,
  ...radioProps
}) => (
  <React.Fragment>
    <div className="size--ms weight--bold _mb-md">{title}:</div>

    <div className="lf-time">
      {options.map(e => (
        <label className="radio" key={e.value}>
          <input
            type="radio"
            name={name}
            className="radio__input"
            id={e.value}
            value={e.value}
            checked={e.value === selectedValue}
            onChange={() => setFieldValue(name, [e.value])}
            onBlur={onBlur}
            {...radioProps}
          />
          <span>{e.label}</span>
        </label>
      ))}
    </div>
  </React.Fragment>
);

export default RadiobuttonGroup;
