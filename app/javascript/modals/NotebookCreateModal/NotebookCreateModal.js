import { Button, Form, Input, Modal, Radio, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotebook } from "slices/notesSlice";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";

const NotebookCreateModal = () => {
  const { notesData } = useSelector((state) => state.notes);
  const { createNotebookModalIsOpen } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleCloseModal = () => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.CREATE_NOTEBOOK }));
  };

  const generateParentSelectOptions = () => {
    if (!notesData) return [];

    return Object.entries(notesData).map(([notebookId, notebookData]) => {
      return {
        value: notebookId,
        label: notebookData.name,
      };
    });
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        dispatch(
          createNotebook({ name: values.name, parentId: values.parent_id })
        ).then(() => handleCloseModal());
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // TODO: make sure we focus when this opens

  return (
    <Modal
      open={createNotebookModalIsOpen}
      title="Create a Notebook"
      okText="Create"
      cancelText="Cancel"
      onCancel={handleCloseModal}
      onOk={handleSubmit}
    >
      <Form
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Notebook Name"
          rules={[
            {
              required: true,
              message: "Please enter a notebook",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="parent_id" label="Parent Notebook">
          <Select
            showSearch
            allowClear
            placeholder="Select a parent notebook or leave blank"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={generateParentSelectOptions()}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NotebookCreateModal;
