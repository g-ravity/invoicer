import React from "react";

import "../assets/css/Input.css";

const Input = ({ name, placeholder, label, type }) => {
  return (
    <div id="input-box">
      <div className="label">{label}</div>
      <input name={name} placeholder={placeholder} />
    </div>
  );
};

Input.defaultProps = {
  placeholder: null,
  type: "text"
};

export default Input;
