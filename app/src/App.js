import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import ReactGoogleMaps from "./Pages/Demos/ReactGoogleMaps";
import "./App.css";

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={ReactGoogleMaps} />
      <Route render={() => "404 Page"} />
    </Switch>
  </HashRouter>
);

export default App;
