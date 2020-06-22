import { Table, Space, Divider, Form, Input, Button, Row, Col } from "antd";
import React, { Component } from "react";
import GenericModal from "../GenricModal/GenricModel";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  addUser,
  removeUser,
  editUser,
  editUserPopUpVisible,
} from "../../action";

const addModelInfo = {
  title: "Add New User",
};
const editModelInfo = {
  title: "Edit New User",
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

class UserTable extends Component {
  constructor() {
    super();
    this.state = {
      addPopUpVisible: false,
      loading: false,
    };
  }

  onFinish = (values) => {
    this.props.addUsers(values);
  };

  updateVisiblePop(value) {
    this.setState({
      addPopUpVisible: value,
    });
  }

  loadForm(initialValue, submit, index) {
    return (
      <Form
        name="basic"
        initialValues={initialValue}
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
              loading={this.state.loading}
            >
              Submit
            </Button>
            <Button
              key="back"
              onClick={() =>
                initialValue
                  ? this.props.updateVisibleUserForEdit(false, index)
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

  onAddUser = (values) => {
    this.props.addUsers(values);
    this.setState({
      addPopUpVisible: false,
    });
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record, index) => (
          <Space size="small">
            <GenericModal
              buttonTitle="Edit"
              modalData={editModelInfo}
              visible={record.visible}
              updateVisible={(value, index) =>
                this.props.updateVisibleUserForEdit(value, index)
              }
              index={index}
            >
              {this.loadForm(record, this.props.editUsers, index)}
            </GenericModal>
            <Divider type="vertical" orientation="center" plain />
            <Button
              type="text"
              danger
              onClick={() => this.props.removeUsers(index)}
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
          buttonTitle="Create User"
          modalData={addModelInfo}
          visible={this.state.addPopUpVisible}
          updateVisible={(value) => this.updateVisiblePop(value)}
        >
          {this.loadForm(null, this.onAddUser)}
        </GenericModal>
        <Table
          columns={columns}
          dataSource={this.props.users}
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUsers: (user) => dispatch(addUser(user)),
    editUsers: (user, index) => dispatch(editUser(user, index)),
    removeUsers: (index) => dispatch(removeUser(index)),
    updateVisibleUserForEdit: (value, index) =>
      dispatch(editUserPopUpVisible(value, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
