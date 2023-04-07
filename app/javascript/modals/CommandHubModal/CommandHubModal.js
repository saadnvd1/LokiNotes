import React from "react";
import { Modal, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";

const CommandHubModal = () => {
  const dispatch = useDispatch();
  const { commandHubModalIsOpen } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
  };

  return (
    <Modal open={commandHubModalIsOpen} onCancel={handleClose} footer={null}>
      {/*<Tabs defaultActiveKey="1" items={items} onChange={onChange} />*/}
    </Modal>
  );
};

export default CommandHubModal;
