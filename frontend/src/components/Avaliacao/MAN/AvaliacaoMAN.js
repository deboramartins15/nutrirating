import React from "react";
import MultiStep from "react-multistep";

import "./AvaliacaoMAN.css";

import Triagem from "./steps/Triagem";
import AvGlobal from "./steps/AvGlobal";
import Resultado from "./steps/Resultado";

export default function AvaliacaoMAN() {
  const steps = [
    { name: "Triagem", component: <Triagem /> },
    { name: "Avaliação Global", component: <AvGlobal /> },
    { name: "Resultado", component: <Resultado /> }
  ];
  return (
    <div className="container-man">
      <div className="header-man">
        <span>Mini Avaliação Nutricional</span>
      </div>
      <MultiStep showNavigation={true} steps={steps} />
    </div>
  );
}
