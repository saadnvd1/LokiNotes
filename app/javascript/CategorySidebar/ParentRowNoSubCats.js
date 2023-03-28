import React from "react";

const ParentRowNoSubCats = ({
  catId,
  handleChangeCategory,
  catData,
  classNames,
}) => {
  return (
    <li
      key={catId}
      onClick={() => handleChangeCategory(catId)}
      className={classNames}
    >
      <span>{catData.name}</span>
    </li>
  );
};

export default ParentRowNoSubCats;