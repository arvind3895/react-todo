import React, { Component } from "react";
import "./App.css";
import { Button, Row, Col } from "antd";
import { toggleLogin } from "./action";
import { DatabaseOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { connect } from "react-redux";
// import TabsContainer from "./components/TabsContainer/TabsContainer";
import { Routes } from "./Routes/route";
import { Link, BrowserRouter as Router } from "react-router-dom";

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout>
            <Header className="header">
              <Row>
                <Col span={20}>
                  <div className="logo">
                    <DatabaseOutlined
                      style={{ fontSize: "16px", color: "#fff" }}
                    />
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        marginLeft: 10,
                      }}
                    >
                      Task Manager
                    </span>
                  </div>
                </Col>
                <Col span={4}>
                  <div style={{ textAlign: "right" }}>
                    <Button onClick={() => this.props.toggleLoginUser()}>
                      <Link to={!this.props.login ? "/dashboard" : "/home"}>
                        {this.props.login ? "Logout" : "Login"}
                      </Link>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Header>
            {/* {this.props.login ? (
            <Content
              className="site-layout"
              style={{ padding: "0 30px", marginTop: 20, minHeight: 400 }}
            >
              <TabsContainer />
            </Content>
          ) : (
            <Content>
              <h1 style={{ textAlign: "center" }}> Please Login</h1>
            </Content>
          )} */}
            <Routes></Routes>
          </Layout>
        </div>
      </Router>
    );
    // return <Routes></Routes>;
  }
}
const mapStateToProps = (state) => {
  return {
    todos: state.test,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoginUser: () => dispatch(toggleLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
