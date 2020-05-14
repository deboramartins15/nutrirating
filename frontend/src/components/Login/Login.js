import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import "./Login.css";

import bg from "../../assets/bg_login.png";
import logo from "../../assets/logo.png";

import Api from "../../service/api";
import { login } from "../../actions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao_senha, setConfSenha] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  async function logon(history) {
    try {
      const response = await Api.post("/login", {
        email,
        senha
      });

      const user = {
        id: response.data.id,
        nome: response.data.nome,
        email: response.data.email
      };

      const { token } = response.data;

      await localStorage.setItem("@nutrirating:token", token);
      await dispatch(login(user));
      history.push("/home");
    } catch (response) {
      if (response.data) setError(response.data.error);
    }
  }

  async function signin(history) {
    try {
      await Api.post("/signup", {
        email,
        senha,
        confirmacao_senha
      });

      logon(history);
    } catch (response) {
      if (response.data) setError(response.data.error);
    }
  }

  return (
    <div className="container-login">
    {!!error && (
      <Alert
        className="above msg-login"
        dismissible
        variant="danger"
        onClose={() => setError("")}
      >
        <span>{error}</span>
      </Alert>
    )}
      <div className="banner-login">
        <img src={bg} alt="bg" />
      </div>
      <div className="header-login above">
        <img src={logo} alt="logo" />
      </div>
      <div className="content-login above">        
        <div className="form-login above">
          <span className="title-login">Já possui conta? Entre já</span>
          <input
            className="inputs"
            type="text"
            placeholder="Email"
            onChange={t => setEmail(t.target.value)}
          ></input>
          <input
            className="inputs"
            type="password"
            placeholder="Senha"
            onChange={t => setSenha(t.target.value)}
          ></input>
          <div className="btn-login">
            <Route
              render={({ history }) => (
                <button onClick={() => logon(history)}>Entrar</button>
              )}
            />
          </div>
          <Link to="/forgot-pass">
            {" "}
            <span className="forgot-pass">Esqueceu a senha ?</span>{" "}
          </Link>
        </div>
        <div className="form-signin above">
          <span className="title-login">
            Novo por aqui? Cadastre-se e comece já
          </span>
          <input
            className="inputs"
            type="text"
            placeholder="Email"
            onChange={t => setEmail(t.target.value)}
          ></input>
          <input
            className="inputs"
            type="password"
            placeholder="Senha"
            onChange={t => setSenha(t.target.value)}
          ></input>
          <input
            className="inputs"
            type="password"
            placeholder="Confirmação senha"
            onChange={t => setConfSenha(t.target.value)}
          ></input>
          <div className="btn-signin">
            <Route
              render={({ history }) => (
                <button onClick={() => signin(history)}>Comece já</button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
