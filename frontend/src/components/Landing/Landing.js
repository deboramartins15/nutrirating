import React from 'react'

import "./Landing.css"
import bg from "../../assets/bg_landing.png"
import logo from "../../assets/logo_desktop.png"

function Landing(props){
    return(
        <>
            <div className="container">
                <img src={bg} alt="bg"></img>
                <div className="header">
                    <img src={logo} alt="logo"></img>
                    <button className="btnEntrar">Entrar</button>
                </div>                
                <div className="content"></div>
            </div>
        </>
    )
}

export default Landing;