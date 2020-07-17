import { Table, Space, Divider, Button } from "antd";
import React, { useState } from "react";
import GenericModal from "../GenricModal/GenricModel";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { addTodo, editTodo, removeTodo, editPopUpVisible } from "../../action";
import { connect } from "react-redux";
import { addTodoModelInfo, editTodoModelInfo } from "../../config/config";
import { ToDoForm } from "../ToDoForm/ToDoForm";

const TaskTable = (props) => {
  const [addPopUpVisible, setAddPopUpVisible] = useState(false);

  const onAddTask = (values) => {
    props.addTask(values);
    setAddPopUpVisible(false);
  };
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
            icon={<EditOutlined />}
            modalData={editTodoModelInfo}
            visible={record.visible}
            updateVisible={(value, index) =>
              props.updateVisibleForEdit(value, index)
            }
            index={index}
          >
            <ToDoForm
              submit={props.editTask}
              initialValue={record}
              updateVisible={(value, index) =>
                props.updateVisibleForEdit(value, index)
              }
              index={index}
            />
          </GenericModal>
          <Divider type="vertical" orientation="center" plain />
          <Button type="text" danger onClick={() => props.removeTask(index)}>
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
        modalData={addTodoModelInfo}
        visible={addPopUpVisible}
        updateVisible={(value) => setAddPopUpVisible(value)}
      >
        <ToDoForm
          submit={onAddTask}
          updateVisible={(value) => setAddPopUpVisible(value)}
        />
      </GenericModal>
      <Table
        columns={columns}
        dataSource={props.todos}
        style={{
          marginTop: 10,
        }}
      />
    </>
  );
};
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
