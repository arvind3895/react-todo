import { Button, Form, DatePicker, Input, Row, Col } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { formItemLayout } from "../../config/config";
export const ToDoForm = ({ initialValue, submit, index, updateVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  return (
    <Form
      form={form}
      name="basic"
      initialValues={{
        lastDate: initialValue?.lastDate
          ? moment(initialValue?.lastDate, "DD-MM-YYYY")
          : "",
        task: initialValue?.task,
      }}
      onFinish={(values) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          form.resetFields();
          index >= 0 ? submit(values, index) : submit(values);
        }, 2000);
      }}
      {...formItemLayout}
    >
      <Form.Item
        name="lastDate"
        label="Last Date"
        rules={[
          {
            required: true,
            message: "Please Select the date",
          },
        ]}
      >
        <DatePicker
          placeholder="Select Date"
          format="DD/MM/YYYY"
          disabledDate={(d) =>
            !d || d.isSameOrBefore(moment().subtract(1, "day"))
          }
        />
      </Form.Item>
      <Form.Item
        label="Task"
        name="task"
        rules={[
          {
            required: true,
            message: "Please input your task!",
          },
        ]}
      >
        <Input placeholder="Please enter the task" />
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
