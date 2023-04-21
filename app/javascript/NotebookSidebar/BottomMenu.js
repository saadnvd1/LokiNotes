import React from "react";
import "./BottomMenu.css";
import { Menu, Tooltip } from "antd";
import {
  ArrowRightOnRectangleIcon,
  UserIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logout } from "slices/userSlice";
import { toggleModal, MODAL_NAMES } from "slices/modalSlice";
import { isWindows } from "helpers/platform";

const BottomMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[]}
        items={[
          {
            key: "command-center",
            label: (
              <Tooltip
                title={`Find all your notes quickly (${
                  isWindows() ? "Ctrl" : "Cmd"
                } + P)`}
                mouseEnterDelay={0.5}
                style={{ zIndex: 999 }}
              >
                Command Hub
              </Tooltip>
            ),
            icon: <CommandLineIcon height="16px" />,
            onClick: () => {
              dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
            },
          },
          {
            key: "account",
            label: "My Account",
            icon: <UserIcon height="16px" />,
            onClick: () => {
              dispatch(toggleModal({ modalName: MODAL_NAMES.ACCOUNT }));
            },
          },
          {
            key: "logout",
            label: "Log Out",
            icon: <ArrowRightOnRectangleIcon height="16px" />,
            onClick: handleLogout,
          },
        ]}
      />
    </div>
  );
};

export default BottomMenu;
