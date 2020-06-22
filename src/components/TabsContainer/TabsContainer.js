import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import { UserOutlined, DatabaseFilled } from "@ant-design/icons";
import UserTable from "../UserTab/UserTab";
import TaskTable from "../TodoTab/TodoTab";

const { TabPane } = Tabs;

class TabsContainer extends Component {
  render() {
    return (
      <Tabs
        defaultActiveKey="1"
        className="tab"
        style={{ padding: "0 30px", marginTop: 20 }}
      >
        <TabPane
          tab={
            <span>
              <DatabaseFilled />
              Todos
            </span>
          }
          key="1"
        >
          <TaskTable></TaskTable>
        </TabPane>
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Users
            </span>
          }
          key="2"
        >
          <UserTable></UserTable>
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
