import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { BuilderPage, LandingPage, NewWarbandCreationPage, SampleWarbandsPage } from "./pages";

const App = () =>
  <BrowserRouter>
    <div id="appBody">
      <Switch>
        <Route path="/SampleWarbands" component={SampleWarbandsPage} />
        <Route path="/NewWarband" component={NewWarbandCreationPage} />
        <Route path="/Builder" component={BuilderPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  </BrowserRouter>;


export const AppContainer = connect()(App);
