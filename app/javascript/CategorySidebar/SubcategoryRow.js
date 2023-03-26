import React from "react";

const SubcategoryRow = ({ buildCategory, catData, menu, catId }) => {
  return (
    <ul
      className={`submenu ${!menu[catId]?.showSubMenu ? "display-none" : ""}`}
    >
      {Object.entries(catData.subcategories).map(([subId, subData]) =>
        buildCategory(subId, subData)
      )}
    </ul>
  );
};

export default SubcategoryRow;
