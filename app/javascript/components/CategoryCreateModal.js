import { Button, Form, Input, Modal, Radio } from "antd";
import React from "react";

const CategoryCreateModal = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a New Category"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="category"
          label="Category Name"
          rules={[
            {
              required: true,
              message: "Please enter a category",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="parent_cateogry" label="Parent Category">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryCreateModal;
