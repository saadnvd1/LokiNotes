import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, ConfigProvider, Input } from "antd";
const { TextArea } = Input;
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const HelloMessage = ({ name }) => {
  const [value, setValue] = useState("");

  const [mainCollapsed, setMainCollapsed] = useState(false);
  const [secondaryCollapsed, setSecondaryCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#222426",
        },
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={mainCollapsed}>
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
        <Sider trigger={null} collapsible collapsed={secondaryCollapsed}>
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
          ></Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: "0px",
              overflowY: "scroll",
            }}
          >
            <ReactQuill value={value} onChange={setValue} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default HelloMessage;
