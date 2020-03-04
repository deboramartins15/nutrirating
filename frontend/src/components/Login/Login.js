import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./Login.css";

import bg_desk from "../../assets/bg_login.png";
import bg_mobile from "../../assets/bg_login_mobile.png";
import logo_desk from "../../assets/logo_desktop_login.png";
import logo_mobile from "../../assets/logo_mobile.png";

import Api from "../../service/api";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  async function logon(history) {}

  async function signin(history) {}

  return (
    <div className="container">
      <img className="img_mobile" src={bg_mobile} alt="bg_mobile"></img>
      <img className="img_desk" src={bg_desk} alt="bg"></img>
      <div className="header_login above">
        <img className="logo_mobile" src={logo_mobile} alt="logo_mobile"></img>
        <img className="logo_desk" src={logo_desk} alt="logo_"></img>
      </div>
      <div className="form_login above">
        <span className="title_login">Já possui conta? Entre já</span>
        <input className="inputs" type="text" placeholder="Email" onChange={t => setEmail(t.target.value)}></input>
        <input className="inputs" type="password" placeholder="Senha" onChange={t => setPassword(t.target.value)}></input>
        <div className="button_login">
          <Link to="/login">
            {" "}
            <button className="btnSecondary">Entrar</button>{" "}
          </Link>
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
          onChange={t => setPassword(t.target.value)}
        ></input>
        <div className="button_signin">
          <Link to="/signup">
            {" "}
            <button className="btnPrimary">Comece já</button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
