import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.css";
import MaterialIcon from "material-icons-react";
import Gravatar from "react-gravatar";

function Home(props) {
   const profissional = useSelector(state => state.Login.profissional);   

  function menuToggle() {
    const aside = document.querySelector(".mainAside");
    const content = document.querySelector(".mainContent");

    aside.classList.toggle("asideToggle");
    content.classList.toggle("contentToggle");
  }

  return (
    <>
      <section id="main">
        <header className="mainHeader">
          <div className="menu-toggle">
            <MaterialIcon
              icon="menu"
              color="#FFF"
              onClick={() => menuToggle()}
            />
          </div>
          <div className="menu">
            <Gravatar
              className="menu-img"
              email={`testeiconuser@gmail.com`}
              alt="icon"
            />
          </div>
        </header>
        <article className="mainContent">
          <div className="maincontent">
            <h1>Conteudo </h1>
          </div>
        </article>
        <aside className="mainAside">
          <div className="menu-header">
            <Gravatar
              className="menu-img"
              email={`testeiconuser@gmail.com`}
              alt="icon"
            />
            <span>{profissional.nome? profissional.nome : profissional.email}</span>
            <div className="menu-item">
              <MaterialIcon icon="logout" color="#FFF" />
              <li>
                <Link to={"/"} className="menu-item-text">
                  Sair
                </Link>
              </li>
            </div>
          </div>
          <ul className="menu-lista">
            <div className="menu-item">
              <MaterialIcon icon="people" color="#FFF" />
              <li>
                <Link to={"/pacientes"} className="menu-item-text">
                  Pacientes
                </Link>
              </li>
            </div>
            <div className="menu-item">
              <MaterialIcon icon="insert_drive_file" color="#FFF" />
              <li>
                <Link to={"/exames"} className="menu-item-text">
                  Avaliações
                </Link>
              </li>
            </div>
            <div className="menu-item">
              <MaterialIcon icon="settings" color="#FFF" />
              <li>
                <Link to={"/config"} className="menu-item-text">
                  Configurações
                </Link>
              </li>
            </div>
          </ul>
        </aside>
      </section>
    </>
  );
}

export default Home;
