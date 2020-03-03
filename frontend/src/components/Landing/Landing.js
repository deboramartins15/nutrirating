import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

import bg_desk from "../../assets/bg_landing.png";
import bg_mobile from "../../assets/bg_landing_mobile.png";
import logo_desk from "../../assets/logo_desktop.png";
import logo_mobile from "../../assets/logo_mobile.png";

function Landing(props) {
  return (
    <>
      <div className="container">
        <img className="img_desk" src={bg_desk} alt="bg"></img>
        <img className="img_mobile" src={bg_mobile} alt="bg"></img>
        <div className="header above">
          <img className="logo_mobile" src={logo_mobile} alt="logo"></img>
          <img className="logo_desk" src={logo_desk} alt="logo"></img>
          <Link to="/login"> <button className="btnEntrar">Entrar</button> </Link>
        </div>
        <div className="content above">
          <div className="title">
            <h2 id="title-1">Ajudando</h2>
            <h2 id="title-2">você</h2>
          </div>
          <div className="subtitle">
            <h5>a avaliar quem importa</h5>
          </div>
          <div className="buttons">
            <Link to="/signup"> <button className="btnSecondary">Comece já</button> </Link>
            <Link to="/login"> <button className="btnSecondary btnEntrarSec">Entrar</button> </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
