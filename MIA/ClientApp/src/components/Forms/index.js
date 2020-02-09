import React from "react";
import { useForm } from "react-hook-form";
import Constants from "./Constants";

export function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map(child => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    key: child.props.name
                  }
                })
              : child;
          })
        : children}
    </form>
  );
}

export function Input({ register, name, ...rest }) {
  return <input name={name} ref={register} {...rest} />;
}

export function Textarea({ register, name, ...rest }) {
  return <textarea name={name} ref={register} {...rest}></textarea>;
}

export function Select({ register, options, name, ...rest }) {
  return (
    <select name={name} ref={register} {...rest}>
      {options.map((value, i) => (
        <option key={i} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export { Constants };
