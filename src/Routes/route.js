import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React, { Component, Suspense, lazy } from "react";
// import TabsContainer from "../components/TabsContainer/TabsContainer";
// import Home from "../components/Home/home";
const TabsContainer = lazy(() =>
  import("../components/TabsContainer/TabsContainer")
);
const Home = lazy(() => import("../components/Home/home"));
export class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={TabsContainer} />
        </Switch>
      </Suspense>
    );
  }
}
