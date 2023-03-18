import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  CaretDownFilled,
  VideoCameraOutlined,
  CaretUpFilled,
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
import Icon from "antd/es/icon";

const App = (s) => {
  const [menu, setMenu] = useState({});
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

  // Setup Menu State
  useEffect(() => {
    if (notesData) {
      setupMenuItems(notesData);
    }
  }, [notesData]);

  const toggleSubmenu = (categoryId) => {
    const menuCopy = menu;
    menuCopy[categoryId].showSubMenu = !menuCopy[categoryId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const setupMenuItems = (categories) => {
    const items = {};

    categories.forEach((category) => {
      items[category.id] = {
        selected: false,
        showSubMenu: false,
      };
    });

    setMenu(items);
  };

  const buildCategory = (category) => {
    if (!category) return;

    if (category.subcategories.length > 0) {
      return (
        <div key={category.id}>
          <li
            className={`single-menu-item parent-menu ${
              category.id === selectedCategoryId ? "menu-selected" : ""
            }
        `}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <div className="parent-menu-title">
              <span>{category.name}</span>
              {!menu[category.id]?.showSubMenu && (
                <CaretDownFilled onClick={() => toggleSubmenu(category.id)} />
              )}
              {menu[category.id]?.showSubMenu && (
                <CaretUpFilled onClick={() => toggleSubmenu(category.id)} />
              )}
            </div>
          </li>
          <ul
            className={`submenu ${
              !menu[category.id]?.showSubMenu ? "display-none" : ""
            }`}
          >
            {category.subcategories.map((subcategory) =>
              buildCategory(subcategory)
            )}
          </ul>
        </div>
      );
    }

    console.log("menu", menu);
    console.log("selectedCategoryId", selectedCategoryId);

    return (
      <li
        key={category.id}
        className={`single-menu-item ${
          category.id === selectedCategoryId ? "menu-selected" : ""
        }`}
        onClick={() => setSelectedCategoryId(category.id)}
      >
        <span>{category.name}</span>
      </li>
    );
  };

  const buildCategories = () => {
    if (!notesData) return;
    return notesData.map((noteCategory) => buildCategory(noteCategory));
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={mainCollapsed}>
        <ul className="menu">{buildCategories()}</ul>
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
