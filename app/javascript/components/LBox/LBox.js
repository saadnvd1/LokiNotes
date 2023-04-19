import React from "react";
import "./LBox.css";

const LBox = ({ children, style, ...props }) => {
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
    <div className={`LBox ${classNames}`} style={style}>
      {children}
    </div>
  );
};

export default LBox;
