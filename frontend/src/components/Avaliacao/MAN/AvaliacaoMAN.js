import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "react-bootstrap/Alert";

import "./AvaliacaoMAN.css";

import Api from "../../../service/api";

export default function AvaliacaoMAN() {
  const profissional = useSelector(state => state.Login.profissional);
  const [paciente,setPaciente] = useState("")
  const [pacientes,setPacientes] = useState([])
  const [etapa,setEtapa] = useState("Triagem")
  const [msgs, setMsgs] = useState("");
  const [triagem, setTriagem] = useState({
    diminuicao_ingestao_alimentar: 0,
    perda_peso: 0,
    mobilidade: 0,
    stress_psicologico: 0,
    doenca_neuropsic: 0,
    imc: 0,
  });
  const [avGlobal, setAvGlobal] = useState({
    vive_propria_casa: 0,
    qtd_medicamentos: 0,
    escaras_lesoes_pele: 0,
    qtd_refeicao_dia: 0,
    somatorio_consumo: 0,
    consumo_frutas_hortalicas: 0,
    consumo_liquidos: 0,
    modo_alimentacao: 0,
    problema_nutricional: 0,
    comparacao_faixa_etaria: 0,
    perimetro_braquial: 0,
    perimetro_perna: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await Api.get(`/pacientes/${profissional.id}`);
      setPacientes(response.data);
    } catch (err) {
      console.log(err.data);
    }
  }

  function handleTriagem(e) {
    e.preventDefault();

    let resultado = 0;
    Object.entries(triagem).forEach(([key, value]) => {
      resultado += parseInt(value);
    });

    //  SE O RESULTADO FOR <= 11, MOSTRA A AV GLOBAL
    if (resultado <= 11) {
      setMsgs(`Resultado: ${resultado}. Prossiga para a Avaliação Global.`);
      const avG = document.querySelector(".container-avglobal");
      const t = document.querySelector(".container-triagem");

      avG.classList.remove("hide_av");
      avG.classList.add("show_av");

      t.classList.add("hide_av");
      setEtapa("Avaliação Global")
    } else {
      // CHAMADA A API
      // MOSTRA O RESULTADO
      setMsgs(`Resultado: ${resultado}`);
      // DESABILITA ATRAVES DO STATE O BOTÃO DO RESULTADO
    }
  }

  function handleAvGlobal(e) {
    e.preventDefault();
    console.log(avGlobal);
  }

  return (
    <div className="container-man">
      <div className="msgs-man">
      {!!msgs && (
        <Alert
          className="above"
          dismissible
          variant="info"
          onClose={() => setMsgs("")}
        >
          <span>{msgs}</span>
        </Alert>
      )}      
      </div>
      <div className="header-man">
        <span>Mini Avaliação Nutricional</span>
      </div>
      <div className="header-etapa">
        <span>{etapa}</span>
        <Input className="pac-man" type="select" onChange={(e) => setPaciente(e.target.value)}>
          <option>Paciente...</option>
          {pacientes.map(pac => {
            return <option>{pac.nome}</option>
          })}
        </Input>
      </div>
      <div className="container-triagem">
        <div className="triagem-form">
          <Form>
            <Row className="triagem-form-row">
              <Col className="triagem-form-col">
                <FormGroup>
                  <Label className="form-triagem-label">
                    Nos últimos três meses houve diminuição da ingesta alimentar
                    devido a perda de apetite,problemas digestivos ou
                    dificuldade para mastigar ou deglutir?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setTriagem({
                        ...triagem,
                        diminuicao_ingestao_alimentar: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Diminuição grave de ingesta</option>
                    <option value="1">Diminuição moderada da ingesta</option>
                    <option value="2">Sem diminuição da ingesta</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="triagem-form-col">
                <FormGroup>
                  <Label className="form-triagem-label">
                    Perda de peso nos últimos 3 meses
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setTriagem({
                        ...triagem,
                        perda_peso: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Superior a três quilos</option>
                    <option value="1">Não sabe informar</option>
                    <option value="2">Entre um e três quilos</option>
                    <option value="3">Sem perda de peso</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="triagem-form-col">
                <FormGroup>
                  <Label className="form-triagem-label">Mobilidade</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setTriagem({
                        ...triagem,
                        mobilidade: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">
                      Restrito ao leito ou à cadeira de rodas
                    </option>
                    <option value="1">
                      Deambula mas não é capaz de sair de casa
                    </option>
                    <option value="2">Normal</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="triagem-form-row">
              <Col className="triagem-form-col">
                <FormGroup>
                  <Label className="form-triagem-label">
                    Passou por algum stress psicológico ou doença aguda nos
                    últimos três meses?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setTriagem({
                        ...triagem,
                        stress_psicologico: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Sim</option>
                    <option value="2">Não</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="triagem-form-col">
                <FormGroup>
                  <Label className="form-triagem-label">
                    Problemas neuropsicológicos
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setTriagem({
                        ...triagem,
                        doenca_neuropsic: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Demência ou depressão graves</option>
                    <option value="1">Demência ligeira</option>
                    <option value="2">Sem problemas psicológicos</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="triagem-form-col">
                <FormGroup>
                  <Label className="form-triagem-label">
                    Índice de Massa Corporal
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setTriagem({
                        ...triagem,
                        imc: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">IMC menor que 19</option>
                    <option value="1">
                      IMC maior ou igual a 19 e menor que 21
                    </option>
                    <option value="2">
                      IMC maior ou igual a 21 e menor que 23
                    </option>
                    <option value="3">IMC maior que 23</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <div className="btn-result-triagem">
              <Button
                color="primary"
                className="ml-3 mt-2 mb-3 btnTriagem"
                onClick={(e) => handleTriagem(e)}
              >
                Resultado Triagem
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="container-avglobal hide_av">
        <div className="avglobal-form">
          <Form>
            <Row className="avglobal-form-row">
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    O doente vive na sua própria casa?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        vive_propria_casa: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    Utiliza mais de três medicamentos diferentes por dia?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        qtd_medicamentos: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Sim</option>
                    <option value="1">Não</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    Lesões de pele ou escaras?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        escaras_lesoes_pele: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Sim</option>
                    <option value="1">Não</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    Quantas refeições faz por dia?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        qtd_refeicao_dia: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Uma refeição</option>
                    <option value="1">Duas refeições</option>
                    <option value="2">Três refeições</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="avglobal-form-row">
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    O paciente consome: - Pelo menos uma porção diária de leite
                    ou derivados(leite,queijo,iogurte)? - Duas ou mais porções
                    semanais de leguminosas ou ovos? - Carne,peixe ou aves todos
                    os dias?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        somatorio_consumo: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Nenhum ou uma resposta sim</option>
                    <option value="0.5">Duas respostas sim</option>
                    <option value="1">Três respostas sim</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    O paciente consome duas ou mais porções diárias de fruta ou
                    produtos hortícolas?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        consumo_frutas_hortalicas: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    Quantos copos de líquidos o paciente consome por dia?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        consumo_liquidos: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Menos de três copos</option>
                    <option value="0.5">Três a cinco copos</option>
                    <option value="1">Mais de cinco copos</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    Modo de se alimentar
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        modo_alimentacao: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">
                      Não é capaz de se alimentar sozinho
                    </option>
                    <option value="1">
                      Alimenta-se sozinho,porém com dificuldade
                    </option>
                    <option value="2">
                      Alimenta-se sozinho sem dificuldade
                    </option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="avglobal-form-row">
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    O paciente acredita ter algum problema nutricional?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        problema_nutricional: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Acredita estar desnutrido</option>
                    <option value="1">Não sabe dizer</option>
                    <option value="2">
                      Acredita não ter um problema nutricional
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    Em comparação com outras pessoas da mesma idade,como
                    considera o paciente a sua própria saúde?
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        comparacao_faixa_etaria: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Pior</option>
                    <option value="0.5">Não sabe</option>
                    <option value="1">Igual</option>
                    <option value="2">Melhor</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    Perímetro braquial(PB) em cm
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        perimetro_braquial: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">PB menor que 21 cm</option>
                    <option value="0.5">PB entre 21 a 22 cm</option>
                    <option value="1">PB maior que 22 cm</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="avglobal-form-col">
                <FormGroup>
                  <Label className="form-avglobal-label">
                    Perímetro da perna(PP) em cm
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setAvGlobal({
                        ...avGlobal,
                        perimetro_perna: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">PP menor que 31 cm</option>
                    <option value="1">PP maior ou igual a 31 cm</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <div className="btn-result-avglobal">
              <Button
                color="primary"
                className="ml-3 mt-2 mb-3 btnavglobal"
                onClick={(e) => handleAvGlobal(e)}
              >
                Resultado Final
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
