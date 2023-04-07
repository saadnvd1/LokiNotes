import React, { useRef, useState } from "react";
import { Modal, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";
import BillingTab from "modals/MyAccountModal/BillingTab";
import useKeyboardShortcut from "use-keyboard-shortcut";
import Draggable from "react-draggable";

const CommandHubModal = () => {
  const dispatch = useDispatch();
  const { commandHubModalIsOpen } = useSelector((state) => state.modal);
  const [disabled, setDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  useKeyboardShortcut(
    ["Meta", "P"],
    (shortcutKeys) => {
      setActiveTab("1");

      if (!commandHubModalIsOpen) {
        dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
      }
    },
    {
      overrideSystem: true,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  );

  useKeyboardShortcut(
    ["Meta", "Shift", "F"],
    (shortcutKeys) => {
      setActiveTab("2");

      if (!commandHubModalIsOpen) {
        dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
      }
    },
    {
      overrideSystem: true,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  );

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef(null);

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const handleClose = () => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
  };

  const onChange = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "1",
      label: `Notebooks`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: `Notes`,
      children: "Find All Notes",
    },
  ];

  return (
    <Modal
      mask={false}
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          onFocus={() => {}}
          onBlur={() => {}}
          // end
        >
          <div style={{ textAlign: "center" }}>Command Hub</div>
        </div>
      }
      open={commandHubModalIsOpen}
      footer={null}
      onCancel={handleClose}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        activeKey={activeTab}
      />
    </Modal>
    // <Modal
    //   open={commandHubModalIsOpen}
    //   onCancel={handleClose}
    //   footer={null}
    //   draggable
    // >
    //   <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    // </Modal>
  );
};

export default CommandHubModal;
