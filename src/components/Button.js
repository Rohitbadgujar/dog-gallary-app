import React from "react";

const Button = ({ onClick, text, icon, style }) => {
  return (
    <button
      style={{
        borderRadius: "20px",
        padding: "1em",
        border: "none",
        cursor: "pointer",
        ...style,
      }}
      onClick={onClick}
    >
      {icon}
      &nbsp;&nbsp;
      {text}
    </button>
  );
};

export default Button;