import React from "react";

import "../assets/css/Input.css";

const Input = ({ name, placeholder, label, type, onClick }) => {
  return (
    <div id="input-box">
      <div className="label">{label}</div>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        onClick={onClick}
      />
    </div>
  );
};

Input.defaultProps = {
  placeholder: null,
  type: "text",
  onClick: null
};

export default Input;
