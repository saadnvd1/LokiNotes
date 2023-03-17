import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Input } from "antd";
const { TextArea } = Input;
import React, { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getNotesData } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";

const App = (s) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const { notesData } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const [mainCollapsed, setMainCollapsed] = useState(false);
  const [secondaryCollapsed, setSecondaryCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    dispatch(getNotesData());
  }, []);

  const buildCategory = (category) => {
    if (!category) return;

    console.log("category", category);

    return {
      key: category.id,
      icon: <UserOutlined />,
      label: category.name,
      children: category.subcategories.map((subcategory) =>
        buildCategory(subcategory)
      ),
    };
  };

  const buildCategories = () => {
    if (!notesData) return;

    return notesData.map((noteCategory) => buildCategory(noteCategory));
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={mainCollapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[1]}
          items={buildCategories()}
          // items={[
          //   {
          //     key: "1",
          //     icon: <UserOutlined />,
          //     label: "Django",
          //   },
          //   {
          //     key: "2",
          //     icon: <VideoCameraOutlined />,
          //     label: "Vue.js",
          //   },
          //   {
          //     key: "3",
          //     icon: <UploadOutlined />,
          //     label: "School",
          //     children: [
          //       {
          //         label: "CS 429",
          //         key: "setting:1",
          //         icon: <UploadOutlined />,
          //         children: [
          //           {
          //             label: "Lol",
          //             key: "setting:3",
          //             children: [{ label: "Lol", key: "setting:3" }],
          //           },
          //         ],
          //       },
          //     ],
          //   },
          // ]}
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
            display: "flex",
          }}
        >
          <span style={{ fontSize: "32px", marginLeft: 20, color: "#fff" }}>
            Django Models
          </span>
        </Header>
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
  );
};
export default App;
