import React from "react";
const CheckList = ({
  field: { id, name, value: selectedValue, onChange, onBlur },
  form: { setFieldValue },
  title,
  options,
  ...radioProps
}) => (
  <React.Fragment>
    <div className="lf-group">
      <div className="size--ms weight--bold _mb-def">{title}:</div>
      <div className="lf-checkboxes lf-checkboxes--row">
        {options.map(e => (
          <label className="form-check" key={e.value}>
            <input
              id={e.id}
              onChange={onChange}
              type="checkbox"
              name={name}
              value={e.value}
              {...radioProps}
            />
            <span>{e.label}</span>
          </label>
        ))}
      </div>
    </div>
  </React.Fragment>
);

export default CheckList;
