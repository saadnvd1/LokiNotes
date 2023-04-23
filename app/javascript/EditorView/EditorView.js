import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout, Tabs } from "antd";
import EditorHeader from "EditorView/EditorHeader";
import Editor from "EditorView/Editor";
import "./Tabs.css";
import { SplitPane } from "react-multi-split-pane";
import "./Resizer.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentNoteTitleAndId } from "selectors/notesSelector";
import { createNote, updateSelectedNoteId } from "slices/notesSlice";
import { act } from "react-dom/test-utils";

const EditorView = () => {
  const currentNote = useSelector(selectCurrentNoteTitleAndId);
  const selectedNoteId = useSelector((state) => state.notes.selectedNoteId);
  const previousActiveTabId = useSelector(
    (state) => state.notes.previousActiveTabId
  );
  const dispatch = useDispatch();
  const selectedNotebookId = useSelector(
    (state) => state.notes.selectedNotebookId
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isChangingTab, setIsChangingTab] = useState(false);

  const initialItems = useMemo(
    () => [
      {
        label: "Untitled",
        children: <Editor />,
        key: "default",
        closable: false,
      },
    ],
    []
  );

  const [items, setItems] = useState(initialItems);
  const [activeKey, setActiveKey] = useState("default");

  const handleCreateNote = () =>
    dispatch(createNote({ notebookId: selectedNotebookId }));

  const add = () => {
    setIsAdding(true);
    handleCreateNote().then((res) => {
      debugger;
      const noteId = res.payload.note.id;
      const newPanes = [...items];
      const key = `${noteId}-0`;

      newPanes.push({
        label: "Untitled",
        children: <Editor noteId={noteId} />,
        key,
      });
      setActiveKey(key);
      setItems(newPanes);
      setIsAdding(false);
    });
  };
  const remove = (targetKey) => {
    setIsRemoving(true);
    const newPanes = items.filter((item) => item.key !== targetKey);
    const lastTab = newPanes[newPanes.length - 1];
    const lastItemNoteId = lastTab.key.split("-")[0];
    setItems(newPanes);
    dispatch(updateSelectedNoteId({ noteId: lastItemNoteId }));
    setIsRemoving(false);
    setActiveKey(lastTab.key);
  };

  const handleTabChange = (newActiveKey) => {
    setIsChangingTab(true);
    const noteId = Number(newActiveKey.split("-")[0]);
    dispatch(updateSelectedNoteId({ noteId }));
    setActiveKey(newActiveKey);
    setIsChangingTab(false);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  useEffect(() => {
    if (currentNote && !isAdding && !isRemoving && !isChangingTab) {
      const itemsCopy = [...items];

      const sameOpenNotes = itemsCopy.filter(
        (i) => Number(i.key.split("-")[0]) === currentNote.id
      );

      let item;

      // This is for when we have a note that is already open
      if (sameOpenNotes.length > 0) {
        const activeItem = itemsCopy.find((i) => i.key === activeKey);
        const lastIndex = Number(
          sameOpenNotes[sameOpenNotes.length - 1].key.split("-")[1]
        );

        const newKey = `${currentNote.id}-${lastIndex + 1}`;
        activeItem.key = newKey;
        setActiveKey(newKey);
        item = activeItem;
      } else {
        if (activeKey !== "default") {
          item = itemsCopy.find((i) => i.key === activeKey);
        } else {
          item = itemsCopy[0];
        }

        item.key = `${currentNote.id}-0`;
        setActiveKey(`${currentNote.id}-0`);
      }

      item.label = currentNote.title || "Untitled";
      item.children = <Editor noteId={currentNote.id} />;

      setItems(itemsCopy);
    }
  }, [currentNote]);

  console.log("items", items);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ zIndex: 1 }}>
        <EditorHeader />
      </div>
      <Layout
        style={{
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <div style={{ margin: 10, marginLeft: 30 }}>
              <Tabs
                className="EditorView"
                type="editable-card"
                onChange={handleTabChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
              />
            </div>
          </div>
          {/*<div>*/}
          {/*  <SplitPane>*/}
          {/*    <div>*/}
          {/*      <div style={{ margin: 10, marginLeft: 30 }}>*/}
          {/*        <Tabs*/}
          {/*          className="EditorView"*/}
          {/*          type="editable-card"*/}
          {/*          onChange={onChange}*/}
          {/*          activeKey={activeKey}*/}
          {/*          onEdit={onEdit}*/}
          {/*          items={items}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*      <div style={{ margin: 10, marginLeft: 30 }}>*/}
          {/*        <Tabs*/}
          {/*          className="EditorView"*/}
          {/*          type="editable-card"*/}
          {/*          onChange={onChange}*/}
          {/*          activeKey={activeKey}*/}
          {/*          onEdit={onEdit}*/}
          {/*          items={items}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*      <div style={{ margin: 10, marginLeft: 30 }}>*/}
          {/*        <Tabs*/}
          {/*          className="EditorView"*/}
          {/*          type="editable-card"*/}
          {/*          onChange={onChange}*/}
          {/*          activeKey={activeKey}*/}
          {/*          onEdit={onEdit}*/}
          {/*          items={items}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </SplitPane>*/}
          {/*</div>*/}
          {/*<SplitPane*/}
          {/*  split="vertical"*/}
          {/*  minSize="100%"*/}
          {/*  defaultSize="100%"*/}
          {/*  allowResize={false}*/}
          {/*>*/}
          {/*  <div></div>*/}
          {/*  */}
          {/*</SplitPane>*/}
        </div>
      </Layout>
    </div>
  );
};

export default EditorView;
