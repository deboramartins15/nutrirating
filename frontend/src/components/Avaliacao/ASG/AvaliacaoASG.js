import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "react-bootstrap/Alert";

import "./AvaliacaoASG.css";

import Api from "../../../service/api";

export default function AvaliacaoASG() {
  const profissional = useSelector((state) => state.Login.profissional);
  const [paciente, setPaciente] = useState("");
  const [rOnly, setROnly] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [msgs, setMsgs] = useState("");
  const [peso, setPeso] = useState({
    peso_anterior: 0,
    peso_atual: 0,
    perda_peso: 0,
    mudanca_peso: 0,
  });
  const [ingestao_alimentar, setIngAlimentar] = useState({
    mudanca: 0,
    tempo_mudanca: 0,
    tipo_dieta: 0,
  });
  const [sint_gastroint, setSintGastro] = useState({
    sintoma: 0,
    frequencia: 0,
    duracao: 0,
  });
  const [capac_func, setCapFunc] = useState({
    alteracao: 0,
    duracao: 0,
  });
  const [doenc_comorb, setDocComorb] = useState({
    diag_principal: 0,
    comorbidades: 0,
    requerimento: 0,
    stress_metabol: 0,
  });
  const [exame_fisico, setExFisico] = useState({
    red_gord_subcut: 0,
    perda_muscular: 0,
    edema: 0,
  });
  const [resultado, setResultado] = useState('')

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

  async function handleAsg(e) {
    e.preventDefault();

    console.log({
      peso,
      ingestao_alimentar,
      sint_gastroint,
      capac_func,
      doenc_comorb,
      exame_fisico,
    });

    try {
      const response = await Api.post("/avaliacao/asg", {
        cod_pac: paciente,
        resultado,
        peso,
        ingestao_alimentar,
        sint_gastroint,
        capac_func,
        doenc_comorb,
        exame_fisico,
      });

      setMsgs(`Resultado Final: ${response.data.resultado}`);
      setROnly(true)
    } catch (err) {
      console.log(err.data);
    }
  }

  return (
    <div className="container-asg">
      <div className="msgs-asg">
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
      <div className="header-asg">
        <span>Avaliação Global Subjetiva</span>
      </div>
      <div className="header-etapa">
        <Input
          className="pac-asg"
          type="select"
          onChange={(e) => setPaciente(e.target.value)}
        >
          <option>Paciente...</option>
          {pacientes.map((pac) => {
            return (
              <option key={pac.cod_pac} value={pac.cod_pac}>
                {pac.nome}
              </option>
            );
          })}
        </Input>
      </div>
      <div className="container-form-asg">
        <div className="asg-form">
          <Form>
            <Label className="form-asg-step-label">
              Peso e Mudança de Peso
            </Label>
            <Row className="asg-form-row">
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Peso anterior</Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setPeso({ ...peso, peso_anterior: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Peso atual</Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setPeso({ ...peso, peso_atual: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">
                    Perda de Peso(últimos 6 meses)
                  </Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setPeso({ ...peso, perda_peso: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Mudança de peso</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setPeso({ ...peso, mudanca_peso: e.target.value })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Sem Mudança</option>
                    <option value="1">Aumento</option>
                    <option value="2">Redução</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Label className="form-asg-step-label">Ingestão alimentar</Label>
            <Row className="asg-form-row">
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Mudanças na ingestão</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setIngAlimentar({
                        ...ingestao_alimentar,
                        mudanca: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Sem Mudança</option>
                    <option value="1">Mudança</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Duração mudanças</Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setIngAlimentar({
                        ...ingestao_alimentar,
                        tempo_mudanca: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Tipo dieta</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setIngAlimentar({
                        ...ingestao_alimentar,
                        tipo_dieta: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Sem Mudança</option>
                    <option value="1">Apenas líquida</option>
                    <option value="2">Líquida hipocalórica</option>
                    <option value="3">Jejum</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Label className="form-asg-step-label">
              Sintomas gastrointestinais
            </Label>
            <Row className="asg-form-row">
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Sintomas</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setSintGastro({
                        ...sint_gastroint,
                        sintoma: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Nenhum</option>
                    <option value="1">Anorexia</option>
                    <option value="2">Náusea</option>
                    <option value="3">Vômito</option>
                    <option value="4">Diarréia</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Frequência</Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setSintGastro({
                        ...sint_gastroint,
                        frequencia: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Duração</Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setSintGastro({
                        ...sint_gastroint,
                        duracao: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Label className="form-asg-step-label">Capacidade funcional</Label>
            <Row className="asg-form-row">
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">
                    Alteração da capacidade
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setCapFunc({ ...capac_func, alteracao: e.target.value })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Sem alteração</option>
                    <option value="1">Com alteração</option>
                    <option value="2">Dificuldade ara deambular</option>
                    <option value="3">
                      Dificuldade em realizar atividades
                    </option>
                    <option value="4">Atividade leve</option>
                    <option value="5">
                      Acamado com pouca ou nenhuma atividade
                    </option>
                    <option value="6">Melhora para realizar atividades</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Duração</Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setCapFunc({ ...capac_func, duracao: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Label className="form-asg-step-label">
              Doenças e comorbidades
            </Label>
            <Row className="asg-form-row">
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">
                    Diagnóstico principal
                  </Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setDocComorb({
                        ...doenc_comorb,
                        diag_principal: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Comorbidades</Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setDocComorb({
                        ...doenc_comorb,
                        comorbidades: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Requerimento</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setDocComorb({
                        ...doenc_comorb,
                        requerimento: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Normal</option>
                    <option value="1">Aumentado</option>
                    <option value="2">Reduzido</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Estresse metabólico</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setDocComorb({
                        ...doenc_comorb,
                        stress_metabol: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Nenhum</option>
                    <option value="1">Baixo</option>
                    <option value="2">Moderado</option>
                    <option value="3">Elevado</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Label className="form-asg-step-label">Exame físico</Label>
            <Row className="asg-form-row">
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">
                    Redução de gordura subcutânea
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setExFisico({
                        ...exame_fisico,
                        red_gord_subcut: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Todas áreas</option>
                    <option value="1">Algumas áreas</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Redução muscular</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setExFisico({
                        ...exame_fisico,
                        perda_muscular: e.target.value,
                      })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Todas áreas</option>
                    <option value="1">Algumas áreas</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Edema</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setExFisico({ ...exame_fisico, edema: e.target.value })
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="0">Sim</option>
                    <option value="1">Não</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Label className="form-asg-step-label">Resultado</Label>
            <Row className="asg-form-row">              
              <Col className="asg-form-col">
                <FormGroup className="form-group-asg">
                  <Label className="form-asg-label">Resultado Final</Label>
                  <Input
                    type="select"
                    onChange={(e) =>
                      setResultado(e.target.value)
                    }
                  >
                    <option>Selecionar...</option>
                    <option value="A">Bem nutrido</option>
                    <option value="B">Moderadamente desnutrido</option>
                    <option value="C">Gravemente desnutrido</option>
                  </Input>
                </FormGroup>                            
              </Col>
            </Row>
            <div className="btn-result-asg">
              <Button
                color="primary"
                className="ml-3 mt-2 mb-3"
                disabled={rOnly}
                onClick={(e) => handleAsg(e)}
              >
                Salvar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
