import { Table, Space, Divider, Button } from "antd";
import React, { useState } from "react";
import GenericModal from "../GenricModal/GenricModel";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  addUser,
  removeUser,
  editUser,
  editUserPopUpVisible,
} from "../../action";
import { addUserModelInfo, editUserModelInfo } from "../../config/config";
import { UserForm } from "../UserForm/UserForm";

const UserTable = (props) => {
  const [addPopUpVisible, setAddPopUpVisible] = useState(false);

  const onAddUser = (values) => {
    props.addUsers(values);
    setAddPopUpVisible(false);
  };

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
            buttonType="link"
            buttonTitle="Edit"
            modalData={editUserModelInfo}
            icon={<EditOutlined />}
            visible={record.visible}
            updateVisible={(value, index) =>
              props.updateVisibleUserForEdit(value, index)
            }
            index={index}
          >
            <UserForm
              initialValue={record}
              submit={(value, index) => props.editUsers(value, index)}
              index={index}
              updateVisible={(value, index) =>
                props.updateVisibleUserForEdit(value, index)
              }
            />
          </GenericModal>
          <Divider type="vertical" orientation="center" plain />
          <Button type="text" danger onClick={() => props.removeUsers(index)}>
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
        modalData={addUserModelInfo}
        visible={addPopUpVisible}
        updateVisible={(value) => setAddPopUpVisible(value)}
      >
        <UserForm submit={onAddUser} updateVisible={setAddPopUpVisible} />
      </GenericModal>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={props.users}
        rowKey="email"
        style={{
          marginTop: 10,
        }}
      />
    </>
  );
};

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
