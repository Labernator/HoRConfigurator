import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { LandingPage, WarbandPage } from "./pages";

export const App = () =>
  <BrowserRouter>
    <div id="appBody">
      <Switch>
        <Route path="/Warband" component={WarbandPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  </BrowserRouter>;
