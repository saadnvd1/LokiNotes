import React from "react";
import "./LBox.css";

const LBox = ({ children, style, className, onClick, ...props }) => {
  const classNames = Object.keys(props)
    .map((prop) => {
      const className = prop.replace(
        /([A-Z])/g,
        (match) => `-${match.toLowerCase()}`
      );
      return `${className}`;
    })
    .join(" ");

  return (
    <div
      className={`LBox ${classNames} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default LBox;
