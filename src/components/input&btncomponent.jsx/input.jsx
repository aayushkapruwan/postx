import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    classNamelabel = "",
    classNameInput = "",
    ...propsinput
  },
  ref
) {
  const id = useId();
  return (
    <div>
      {label ? (
        <label htmlFor={id} className={classNamelabel}>
          {label}
        </label>
      ) : null}
      <input ref={ref} type={type} {...propsinput} id={id}></input>
    </div>
  );
});

export default Input;
