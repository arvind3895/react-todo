import {
  Table,
  Space,
  Divider,
  Button,
  Form,
  DatePicker,
  Input,
  Row,
  Col,
} from "antd";
import React, { Component } from "react";
import GenericModal from "../GenricModal/GenricModel";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { addTodo, editTodo, removeTodo, editPopUpVisible } from "../../action";
import { connect } from "react-redux";
import moment from "moment";

const addModelInfo = {
  title: "Add New Task",
};
const editModelInfo = {
  title: "Edit New Task",
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class TaskTable extends Component {
  constructor() {
    super();
    this.state = {
      addPopUpVisible: false,
      loading: false,
    };
  }
  onFinish = (values) => {
    console.log("Success:", values);
    setTimeout(() => {});
    this.props.addTask(values);
    this.formSubmitted = true;
  };
  updateVisiblePop(value) {
    console.log(value, "testing");
    this.setState({
      addPopUpVisible: value,
    });
  }
  loadform(initialValue, submit, index) {
    let loading = false;
    return (
      <Form
        name="basic"
        initialValues={{
          dateAdded: initialValue?.dateAdded
            ? moment(initialValue?.dateAdded, "DD-MM-YYYY")
            : "",
          task: initialValue?.task,
        }}
        onFinish={(values) => {
          this.setState({
            loading: true,
          });
          setTimeout(() => {
            this.setState({
              loading: false,
            });
            index >= 0 ? submit(values, index) : submit(values);
          }, 2000);
        }}
        {...formItemLayout}
      >
        <Form.Item
          name="dateAdded"
          label="DatePicker"
          rules={[
            {
              required: true,
              message: "Please Select the date",
            },
          ]}
        >
          <DatePicker placeholder="Select Date" format="DD/MM/YYYY" />
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
              loading={this.state.loading}
            >
              Submit
            </Button>
            <Button
              key="back"
              onClick={() =>
                initialValue
                  ? this.props.updateVisibleForEdit(false, index)
                  : this.updateVisiblePop(false)
              }
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
  onAddTask = (values) => {
    this.props.addTask(values);
    this.setState({
      addPopUpVisible: false,
    });
  };
  render() {
    const columns = [
      {
        title: "Task",
        dataIndex: "task",
        key: "task",
      },
      {
        title: "Date Added",
        render: (record) => record.dateAdded,
        key: "dateAdded",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record, index) => (
          <Space size="small">
            <GenericModal
              buttonTitle="Edit"
              buttonType="link"
              modalData={editModelInfo}
              visible={record.visible}
              updateVisible={(value, index) =>
                this.props.updateVisibleForEdit(value, index)
              }
              index={index}
            >
              {this.loadform(record, this.props.editTask, index)}
            </GenericModal>
            <Divider type="vertical" orientation="center" plain />
            <Button
              type="text"
              danger
              onClick={() => this.props.removeTask(index)}
            >
              Delete <DeleteOutlined />
            </Button>
          </Space>
        ),
      },
    ];
    return (
      <>
        <GenericModal
          buttonTitle="Create Task"
          modalData={addModelInfo}
          visible={this.state.addPopUpVisible}
          updateVisible={(value) => this.updateVisiblePop(value)}
        >
          {this.loadform(null, this.onAddTask)}
        </GenericModal>
        <Table
          columns={columns}
          dataSource={this.props.todos}
          style={{
            marginTop: 10,
          }}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => dispatch(addTodo(task)),
    editTask: (task, index) => dispatch(editTodo(task, index)),
    removeTask: (index) => dispatch(removeTodo(index)),
    updateVisibleForEdit: (value, index) =>
      dispatch(editPopUpVisible(value, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);
