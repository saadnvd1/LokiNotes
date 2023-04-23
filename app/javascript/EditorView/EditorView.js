import React, { useRef, useState } from "react";
import { Layout, Tabs } from "antd";
import EditorHeader from "EditorView/EditorHeader";
import Editor from "EditorView/Editor";
import "./Tabs.css";
import { SplitPane } from "react-multi-split-pane";
import "./Resizer.css";

const EditorView = () => {
  const initialItems = [
    {
      label: "Tab 1",
      children: <Editor />,
      key: "1",
    },
    {
      label: "Tab 2",
      children: <Editor />,
      key: "2",
    },
    {
      label: "Tab 3",
      children: <Editor />,
      key: "3",
      closable: false,
    },
  ];

  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "New Tab",
      children: "Content of new Tab",
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

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
        // does not currently work in zen mode, one solution is to just remove the position absolute if in zen mode and just add it back if not
        style={{
          position: "relative",
          // marginLeft: 10,
          // marginTop: 8,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <SplitPane>
              <div>
                <div style={{ margin: 10, marginLeft: 30 }}>
                  <Tabs
                    className="EditorView"
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit}
                    items={items}
                  />
                </div>
              </div>
              <div>
                <div style={{ margin: 10, marginLeft: 30 }}>
                  <Tabs
                    className="EditorView"
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit}
                    items={items}
                  />
                </div>
              </div>
              <div>
                <div style={{ margin: 10, marginLeft: 30 }}>
                  <Tabs
                    className="EditorView"
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit}
                    items={items}
                  />
                </div>
              </div>
            </SplitPane>
          </div>
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
