import React from "react";
import "./BottomMenu.css";
import { Menu } from "antd";
import {
  ArrowRightOnRectangleIcon,
  UserIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logout, toggleAccountModal } from "slices/userSlice";

const BottomMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bottom-menu-item">
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[]}
        items={[
          {
            key: "command-center",
            label: "Command Hub",
            icon: <CommandLineIcon height="16px" />,
          },
          {
            key: "account",
            label: "My Account",
            icon: <UserIcon height="16px" />,
            onClick: () => {
              dispatch(toggleAccountModal());
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
