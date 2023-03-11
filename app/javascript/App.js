import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
import "./App.css";

const HelloMessage = ({ name }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">Lokinotes</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["3"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Django",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Vue.js",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "School",
                children: [
                  {
                    label: "CS 429",
                    key: "setting:1",
                    icon: <UploadOutlined />,
                    children: [
                      {
                        label: "Lol",
                        key: "setting:3",
                        children: [{ label: "Lol", key: "setting:3" }],
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["3"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Django Models",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Inheritance",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Random",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default HelloMessage;
