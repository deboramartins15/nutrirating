import React from "react";

import "./Landing.css";
import bg from "../../assets/bg_landing.png";
import logo from "../../assets/logo_desktop.png";

function Landing(props) {
  return (
    <>
      <div className="container">
        <img src={bg} alt="bg"></img>
        <div className="header above">
          <img src={logo} alt="logo"></img>
          <button className="btnEntrar">Entrar</button>
        </div>
        <div className="content above">
          <div className="title">
            <h2 id="title-1">Ajudando</h2>
            <h2 id="title-2">você</h2>
          </div>
          <div className="subtitle">
            <h5>a avaliar quem importa</h5>
          </div>
          <div>
            <button className="btnComece">Comece já</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
