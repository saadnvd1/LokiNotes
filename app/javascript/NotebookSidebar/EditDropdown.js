import React, { useMemo } from "react";
import { Dropdown } from "antd";
import { EditOutlined, SmileOutlined } from "@ant-design/icons";
import {
  PencilSquareIcon,
  TrashIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";

const EditDropdown = ({ isSubnotebook, notebookId }) => {
  const handleRename = () => {};
  const handleDelete = () => {};
  const handleNewSubnotebook = () => {};

  const handleMenuClick = ({ key, domEvent }) => {
    domEvent.stopPropagation();

    switch (key) {
      case "rename":
        handleRename();
        break;
      case "delete":
        handleDelete();
        break;
      case "new-subnotebook":
        handleNewSubnotebook();
        break;
      default:
        break;
    }
  };

  const items = useMemo(() => {
    const defaultItems = [
      {
        key: "rename",
        label: "Rename",
        icon: <PencilSquareIcon height="16" />,
      },
      {
        key: "delete",
        danger: true,
        label: "Delete",
        icon: <TrashIcon height="16" />,
      },
    ];

    if (!isSubnotebook) {
      defaultItems.splice(1, 0, {
        key: "new-subnotebook",
        label: "New Subnotebook",
        icon: <FolderPlusIcon height="16" />,
      });
    }

    return defaultItems;
  }, [isSubnotebook]);

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} arrow>
      <EditOutlined />
    </Dropdown>
  );
};

export default EditDropdown;
