import UpgradeModal from "modals/UpgradeModal/UpgradeModal";
import UpgradeModalSuccess from "modals/UpgradeModalSuccess/UpgradeModalSuccess";
import NotebookCreateModal from "modals/NotebookCreateModal/NotebookCreateModal";
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
