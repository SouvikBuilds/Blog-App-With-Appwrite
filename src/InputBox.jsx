import React, { useId } from "react";

const InputBox = ({ label, type = "text", ref, className = "", ...props }) => {
  const id = useId();

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        className={`${className}`}
        {...props}
      />
    </div>
  );
};

export default InputBox;
