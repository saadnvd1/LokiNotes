import UpgradeModal from "modals/UpgradeModal/UpgradeModal";
import UpgradeModalSuccess from "modals/UpgradeModalSuccess/UpgradeModalSuccess";
import NotebookCreateModal from "modals/NotebookCreateModal/NotebookCreateModal";
import React from "react";
import MyAccountModal from "modals/MyAccountModal/MyAccountModal";

const GlobalComponents = () => {
  return (
    <>
      <UpgradeModal />
      <UpgradeModalSuccess />
      <NotebookCreateModal />
      <MyAccountModal />
    </>
  );
};

export default GlobalComponents;
