import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RecoverPass from "./components/RecorverPass/RecoverPass";
import Professional from "./components/Professional/Professional";
import Paciente from "./components/Paciente/Paciente";
import Historico from "./components/Historico/Historico";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={App} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/forgot-pass" component={RecoverPass} />
          <Route path="/config" component={Professional} />
          <Route path="/pacientes" component={Paciente} />
          <Route path="/historico/:cod_pac" component={Historico} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
