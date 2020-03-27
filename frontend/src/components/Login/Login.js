import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import "./Login.css";

import bg_desk from "../../assets/bg_login.png";
import bg_mobile from "../../assets/bg_login_mobile.png";
import logo_desk from "../../assets/logo_desktop_login.png";
import logo_mobile from "../../assets/logo_mobile.png";

import Api from "../../service/api";
import { login }  from "../../actions"

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
    <div className="container">
      <img className="img_mobile" src={bg_mobile} alt="bg_mobile"></img>
      <img className="img_desk" src={bg_desk} alt="bg"></img>
      <div className="header_login above">
        <img className="logo_mobile" src={logo_mobile} alt="logo_mobile"></img>
        <img className="logo_desk" src={logo_desk} alt="logo_"></img>
      </div>
      {!!error && (
        <Alert
          className="above"
          dismissible
          variant="danger"
          onClose={() => setError("")}
        >
          <span>{error}</span>
        </Alert>
      )}
      <div className="form_login above">
        <span className="title_login">Já possui conta? Entre já</span>
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
        <div className="button_login">
          <Route
            render={({ history }) => (
              <button className="btnSecondary" onClick={() => logon(history)}>
                Entrar
              </button>
            )}
          />
        </div>
        <Link to="/forgot-pass">
          {" "}
          <span className="forgot_pass">Esqueceu a senha ?</span>{" "}
        </Link>
      </div>
      <div className="form_signin above">
        <span className="title_signin">
          Novo por aqui? Cadastre-se e comece já
        </span>
        <input
          className="inputs_signin"
          type="text"
          placeholder="Email"
          onChange={t => setEmail(t.target.value)}
        ></input>
        <input
          className="inputs_signin"
          type="password"
          placeholder="Senha"
          onChange={t => setSenha(t.target.value)}
        ></input>
        <input
          className="inputs_signin"
          type="password"
          placeholder="Confirmação senha"
          onChange={t => setConfSenha(t.target.value)}
        ></input>
        <div className="button_signin">
          <Route
            render={({ history }) => (
              <button className="btnPrimary" onClick={() => signin(history)}>
                Comece já
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
