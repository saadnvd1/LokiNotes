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
import React, { useEffect, useRef, useState } from "react";
const { Header, Sider, Content } = Layout;
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getNotesData, updateNote } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import Icon from "antd/es/icon";
import { isEmpty } from "lodash";

const App = (s) => {
  // TODO: https://www.npmjs.com/package/use-keyboard-shortcut
  const [content, setContent] = useState(null);
  const [menu, setMenu] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const { notesData } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const selectedNoteRef = useRef();

  selectedNoteRef.current = { selectedNoteId, content };

  const [mainCollapsed, setMainCollapsed] = useState(false);
  const [secondaryCollapsed, setSecondaryCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // When you navigate away to another category or note, we always want to save the note
  const saveNote = (noteId, content) => {
    dispatch(
      updateNote({
        noteId,
        content,
      })
    );
  };

  const saveBeforeExit = () => {
    if (selectedNoteId) saveNote(selectedNoteId, content);
  };

  const handleChangeNote = (e) => {
    saveBeforeExit();
    setSelectedNoteId(Number(e.key));
  };

  const handleChangeCategory = (categoryId) => {
    saveBeforeExit();
    setSelectedCategoryId(categoryId);

    // Always select the first note from that category
    if (getCategoryById(categoryId)?.notes[0]) {
      setSelectedNoteId(getCategoryById(categoryId).notes[0]?.id);
    }
  };

  // Initialize the autosave feature
  useEffect(() => {
    const autoSave = () => {
      if (selectedNoteRef.current.selectedNoteId) {
        saveNote(
          selectedNoteRef.current.selectedNoteId,
          selectedNoteRef.current.content
        );
      }
    };
    setInterval(autoSave, 50000);
  }, []);

  useEffect(() => {
    dispatch(getNotesData());
  }, []);

  // Setup Menu State
  useEffect(() => {
    if (notesData) {
      setupMenuItems(notesData);
    }
  }, [notesData]);

  useEffect(() => {
    if (selectedNoteId) {
      const currentNote = getCurrentNote();

      if (
        currentNote &&
        currentNote.content !== null &&
        currentNote.content !== ""
      ) {
        setContent(currentNote.content);
      }
    }
  }, [selectedNoteId]);

  const toggleSubmenu = (categoryId) => {
    const menuCopy = menu;
    menuCopy[categoryId].showSubMenu = !menuCopy[categoryId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const setupMenuItems = (categories) => {
    const items = {};

    Object.keys(categories).forEach((categoryId) => {
      items[categoryId] = {
        selected: false,
        showSubMenu: false,
      };
    });

    setMenu(items);
  };

  const buildCategory = (catId, catData) => {
    if (!catId) return;

    if (!isEmpty(catData.subcategories)) {
      return (
        <div key={catId}>
          <li
            className={`single-menu-item parent-menu ${
              catId === selectedCategoryId ? "menu-selected" : ""
            }
        `}
            onClick={() => handleChangeCategory(catId)}
          >
            <div className="parent-menu-title">
              <span>{catData.name}</span>
              {!menu[catId]?.showSubMenu && (
                <CaretDownFilled onClick={() => toggleSubmenu(catId)} />
              )}
              {menu[catId]?.showSubMenu && (
                <CaretUpFilled onClick={() => toggleSubmenu(catId)} />
              )}
            </div>
          </li>
          <ul
            className={`submenu ${
              !menu[catId]?.showSubMenu ? "display-none" : ""
            }`}
          >
            {Object.entries(catData.subcategories).map(([subId, subData]) =>
              buildCategory(subId, subData)
            )}
          </ul>
        </div>
      );
    }

    console.log("menu", menu);
    console.log("selectedCategoryId", selectedCategoryId);
    console.log("selectedNote", selectedNoteId);
    console.log("content", content);

    return (
      <li
        key={catId}
        className={`single-menu-item ${
          catId === selectedCategoryId ? "menu-selected" : ""
        }`}
        onClick={() => handleChangeCategory(catId)}
      >
        <span>{catData.name}</span>
      </li>
    );
  };

  const buildCategories = () => {
    if (!notesData) return;
    debugger;
    return Object.entries(notesData).map(([catId, catData]) =>
      buildCategory(catId, catData)
    );
  };

  const getCurrentlySelectedCategory = () => {
    if (!notesData) return;

    return getCategoryById(selectedCategoryId);
  };

  const getCategoryById = (id) => {
    return notesData[id];
  };

  const buildNoteItems = () => {
    if (!notesData || !selectedCategoryId) return;

    const categoryNotes = getCurrentlySelectedCategory();

    if (categoryNotes) {
      return categoryNotes.notes.map((note) => ({
        key: note.id,
        label: note.title,
      }));
    }

    return [];
  };

  const getCurrentNote = () => {
    const categoryNotes = getCurrentlySelectedCategory();

    if (categoryNotes) {
      return categoryNotes.notes.find((note) => note.id === selectedNoteId);
    }
  };

  const getNoteForId = (id) => {
    const categoryNotes = getCurrentlySelectedCategory();

    if (categoryNotes) {
      return categoryNotes.notes.find((note) => note.id === id);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={mainCollapsed}
        style={{ color: "white" }}
      >
        <ul className="menu">{buildCategories()}</ul>
      </Sider>
      <Sider trigger={null} collapsible collapsed={secondaryCollapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["3"]}
          items={buildNoteItems()}
          onClick={(e) => {
            handleChangeNote(e);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <span style={{ fontSize: "32px", marginLeft: 20, color: "#fff" }}>
            {getCurrentNote()?.title}
          </span>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: "0px",
            overflowY: "scroll",
          }}
        >
          <div style={{ backgroundColor: "white", color: "black" }}>
            <ReactQuill value={content} onChange={setContent} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
