import UpgradeModal from "modals/UpgradeModal/UpgradeModal";
import UpgradeModalSuccess from "modals/UpgradeModalSuccess/UpgradeModalSuccess";
import NotebookCreateModal from "modals/NotebookCreateModal/NotebookCreateModal";
import React from "react";
import MyAccountModal from "modals/MyAccountModal/MyAccountModal";
import CommandHubModal from "modals/CommandHubModal/CommandHubModal";

const GlobalComponents = () => (
  <>
    <UpgradeModal />
    <UpgradeModalSuccess />
    <NotebookCreateModal />
    <MyAccountModal />
    <CommandHubModal />
  </>
);

export default GlobalComponents;
