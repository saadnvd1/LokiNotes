import { Button, Form, Input, Modal, Radio, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotebook, toggleIsCreatingNotebook } from "slices/notesSlice";

const NotebookCreateModal = () => {
  const { notesData, isCreatingNotebook } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
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
        ).then(() => onCancel());
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={isCreatingNotebook}
      title="Create a Notebook"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => dispatch(toggleIsCreatingNotebook())}
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
            onChange={onChange}
            onSearch={onSearch}
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