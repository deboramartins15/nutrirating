import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";

import "./Home.css";
import MaterialIcon from "material-icons-react";

function Home(props) {
  const profissional = useSelector(state => state.Login.profissional);

  function menuToggle() {
    const aside = document.querySelector(".mainAside");
    const content = document.querySelector(".mainContent");

    aside.classList.toggle("asideToggle");
    content.classList.toggle("contentToggle");
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
            <MaterialIcon icon="account_circle" color="#FFF" />
            <span>
              {profissional.nome ? profissional.nome : profissional.email}
            </span>
          </div>
        </header>
        <article className="mainContent">
          <div className="maincontent">
            <h1>Conteudo </h1>
          </div>
        </article>
        <aside className="mainAside">
          <div className="menu-header">
            <MaterialIcon icon="account_circle" color="#FFF" size="medium" />
            <span>
              {profissional.nome ? profissional.nome : profissional.email}
            </span>
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
                <Link className="menu-item-text" onClick={toggle}>
                  Avaliações
                </Link>
              </li>
            </div>
            <Collapse isOpen={isOpen}>
              <div className="menu-item">
                <MaterialIcon icon="keyboard_arrow_right" color="#FFF" />
                <li>
                  <Link to={"/avaliacao/asg"} className="menu-item-text">Subjetiva Global</Link>{" "}
                </li>
              </div>
              <div className="menu-item">
                <MaterialIcon icon="keyboard_arrow_right" color="#FFF" />
                <li>
                  <Link to={"/avaliacao/man"} className="menu-item-text">Mini Avaliação</Link>{" "}
                </li>
              </div>
            </Collapse>
            <div className="menu-item">
              <MaterialIcon icon="settings" color="#FFF" />
              <li>
                <Link to={"/config"} className="menu-item-text">
                  Configurações
                </Link>
              </li>
            </div>
            <div className="menu-item">
              <MaterialIcon icon="logout" color="#FFF" />
              <li>
                <Link to={"/"} className="menu-item-text">
                  Sair
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
