import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import bg_desk from "../../assets/bg_login.png";
import bg_mobile from "../../assets/bg_login_mobile.png";
import logo_desk from "../../assets/logo_desktop_login.png";
import logo_mobile from "../../assets/logo_mobile.png";

function Login(props) {
    return (
        <div className="container">
            <img className="img_mobile" src={bg_mobile} alt="bg_mobile" ></img>
            <img className="img_desk" src={bg_desk} alt="bg" ></img>
            <div className="header above">
                <img className="logo_mobile" src={logo_mobile} alt="logo_mobile"></img>
                <img className="logo_desk" src={logo_desk} alt="logo_"></img>
            </div>
            <div className="form">
                <input className="inputs" type="text" placeholder="Email"></input>
                <input className="inputs" type="text" placeholder="Usuário"></input>
                <input className="inputs" type="password" placeholder="Senha"></input>
                <div className="buttons">
                    <Link to="/signup"> <button className="btnSecondary">Comece já</button> </Link>
                    <Link to="/login"> <button className="btnSecondary">Entrar</button> </Link>
                </div>
                <Link to="/forgot-pass"> <span>Esqueceu a senha ?</span> </Link>
            </div>
        </div>
    );
}

export default Login;