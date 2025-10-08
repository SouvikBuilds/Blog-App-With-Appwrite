import React, { useId } from "react";

const InputBox = ({ label, type = "text", ref, className = "", ...props }) => {
  const id = useId();

  return (
    <>
      <div className={`w-full ${className}`}>
        {label && (
          <label className="inline-block text-center mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      <input
        id={id}
        type={type}
        ref={ref}
        className={`${className} w-full rounded-lg px-5 py-2`}
        {...props}
      />
    </>
  );
};

export default InputBox;
