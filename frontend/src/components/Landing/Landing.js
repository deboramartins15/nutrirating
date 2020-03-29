import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

import bg from "../../assets/bg_landing.png";
import logo from "../../assets/logo.png";

function Landing(props) {
  return (
    <>
      <div className="container-landing">
        <div className="banner-landing">
          <img src={bg} alt="bg"></img>
        </div>
        <div className="header-landing above">
          <img className="logo-landing" src={logo} alt="logo"></img>
          <Link to="/login">
            {" "}
            <button className="btnEntrar">Entrar</button>{" "}
          </Link>
        </div>
        <div className="content-landing above">
          <h1 className="title">Ajudando você</h1>
          <h6 className="subtitle">a avaliar quem importa</h6>
          <Link to="/signup">
            <button className="btnComece">Comece já</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
