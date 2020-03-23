import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from "./store";

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import RecoverPass from './components/RecorverPass/RecoverPass'
import Professional from './components/Professional/Professional'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Login}/>
        <Route path="/home" component={Home}/>
        <Route path="/forgot-pass" component={RecoverPass}/>
        <Route path="/config" component={Professional}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
