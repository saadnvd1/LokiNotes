import UpgradeModal from "components/UpgradeModal/UpgradeModal";
import UpgradeModalSuccess from "components/UpgradeModalSuccess/UpgradeModalSuccess";
import NotebookCreateModal from "NotebookCreateModal";
import React from "react";

const GlobalComponents = () => {
  return (
    <>
      <UpgradeModal />
      <UpgradeModalSuccess />
      <NotebookCreateModal />
    </>
  );
};

export default GlobalComponents;
