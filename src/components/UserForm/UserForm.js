import { Button, Form, Input, Row, Col } from "antd";
import React, { useState } from "react";
import { formItemLayout } from "../../config/config";
export const UserForm = ({ initialValue, submit, index, updateVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  return (
    <Form
      form={form}
      name="basic"
      initialValues={initialValue}
      onFinish={(values) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          index >= 0 ? submit(values, index) : submit(values);
        }, 2000);
      }}
      {...formItemLayout}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Please enter username" />
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input placeholder="Please enter your email" />
      </Form.Item>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "right",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginRight: 15,
            }}
            loading={loading}
          >
            Submit
          </Button>
          <Button
            key="back"
            onClick={() => {
              form.resetFields();
              updateVisible(false, index);
            }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
