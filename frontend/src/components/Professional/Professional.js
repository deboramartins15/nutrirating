import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import "./Professional.css";

import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import Alert from 'react-bootstrap/Alert'

import Api from "../../service/api";

function Professional(props) {
  const cod_prof = useSelector(state => state.Login.profissional.id);
  const [profissional, setProf] = useState({
    cod_profissional: 0,
    nome: "",
    email: "",
    dt_nasc: "",
    senha: "",
    confirmacao_senha: "",
    sexo: "",
    telefone: "",
    conselho: "",
    num_conselho: ""
  });
  const [msgs, setMsgs] = useState("");
  const [rOnly, setROnly] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await Api.get(`/profissional/${cod_prof}`);
      setProf(response.data);
    } catch (err) {
      console.log(err.data);
    }
  }

  // async function reset() {
  //   setProf({
  //     cod_profissional: 0,
  //     nome: "",
  //     email: "",
  //     dt_nasc: "",
  //     senha: "",
  //     confirmacao_senha: "",
  //     sexo: "",
  //     telefone: "",
  //     conselho: "",
  //     num_conselho: ""
  //   });
  //   //fetchData();
  // }
  async function save() {
    const {
      nome,
      email,
      dt_nasc,
      senha,
      confirmacao_senha,
      sexo,
      telefone,
      conselho,
      num_conselho
    } = profissional;

    try {
      await Api.put(`/profissional/${cod_prof}`, {
        nome,
        email,
        dt_nasc,
        senha,
        confirmacao_senha,
        sexo,
        telefone,
        conselho,
        num_conselho
      });
      setMsgs("Profissional alterado com sucesso !");
      // reset();
    } catch (err) {
      console.log(err.data);
      setMsgs(err.data.error);
    }
  }

  async function remove(history) {
    try {
      alert("Seu usuário será excluído");
      await Api.delete(`/profissional/${cod_prof}`);
      // setMsgs("Profissional excluído com sucesso !");
      // reset();
      alert("Você será redirecionado para a página inicial.");
      history.push("/");
    } catch (err) {
      setMsgs(err.data.error);
    }
  }

  function altSenha() {
    setROnly(false);
    setProf({ ...profissional, senha: "", confirmacao_senha: "" });
  }

  function handleSenha(e){
    if(!rOnly)
      setProf({ ...profissional, senha: e.target.value })
  }
  
  function handleConfSenha(e){
    if(!rOnly)
      setProf({...profissional,confirmacao_senha: e.target.value})
  }
  //   async function fetchPaciente(id, e) {
  //     e.preventDefault();
  //     try {
  //       const response = await Api.get(`/profissional/${id}`);

  //       let dob = new Date(response.data.date_of_birth).toLocaleDateString();
  //       dob = dob.split("/");
  //       const data_format = dob[2] + "-" + dob[1] + "-" + dob[0];

  //       setPaciente(prevPac => ({
  //         ...prevPac,
  //         ...response.data,
  //         date_of_birth: data_format
  //       }));
  //     } catch (err) {
  //       alert(err.data.error);
  //     }
  //   }

  return (
    <>
      <div className="msgs-prof">
        {!!msgs && (
          <Alert dismissible variant="info" onClose={() => setMsgs("")}>
            <span>{msgs}</span>
          </Alert>
        )}
      </div>
      <div className="container-prof">
        <div className="header-prof">
          <span>Profissional</span>
        </div>
        <Form className="prof-form">
          <Row className="prof-form-row">
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="nameprof" className="form-prof-label">
                  Nome
                </Label>
                <Input
                  type="text"
                  name="nameprof"
                  id="nameprof"
                  placeholder="Nome..."
                  value={profissional.nome ? profissional.nome : ""}
                  onChange={e =>
                    setProf({ ...profissional, nome: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="emailprof" className="form-prof-label">
                  Email
                </Label>
                <Input
                  type="text"
                  name="emailprof"
                  id="emailprof"
                  placeholder="Email..."
                  value={profissional.email}
                  readOnly={profissional.email}
                  onChange={e =>
                    setProf({ ...profissional, email: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="senhaprof" className="form-prof-label">
                  Senha
                </Label>
                <Input
                  type="password"
                  name="senhaprof"
                  id="senhaprof"
                  value={profissional.senha}
                  readOnly={rOnly}
                  onChange={e => handleSenha(e)}
                />
              </FormGroup>
            </Col>
            <Col className="prof-form-col">
              <FormGroup className="btnAltSenha">
                <Button
                  color="primary"
                  className="ml-1 mt-4 mb-3 "
                  onClick={() => altSenha()}
                >
                  Alterar senha
                </Button>
              </FormGroup>
            </Col>
          </Row>
          <Row className="prof-form-row">
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="confsenhaprof" className="form-prof-label">
                  Confirmação da Senha
                </Label>
                <Input
                  type="password"
                  name="confsenhaprof"
                  id="confsenhaprof"
                  value={profissional.confirmacao_senha}
                  readOnly={rOnly}
                  onChange={e => handleConfSenha(e)}
                />
              </FormGroup>
            </Col>
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="dobprof" className="form-prof-label">
                  Data Nascimento
                </Label>
                <Input
                  type="date"
                  name="dobprof"
                  id="dobprof"
                  value={profissional.dt_nasc ? profissional.dt_nasc : ""}
                  onChange={e =>
                    setProf({ ...profissional, dt_nasc: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="sexoprof" className="form-prof-label">
                  Sexo
                </Label>
                <Input
                  type="select"
                  name="sexoprof"
                  id="sexoprof"
                  value={profissional.sexo ? profissional.sexo : ""}
                  onChange={e =>
                    setProf({ ...profissional, sexo: e.target.value })
                  }
                >
                  <option>Selecionar...</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row className="prof-form-row">
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="telefoneprof" className="form-prof-label">
                  Telefone
                </Label>
                <Input
                  type="text"
                  name="telefoneprof"
                  id="telefoneprof"
                  value={profissional.telefone ? profissional.telefone : ""}
                  onChange={e =>
                    setProf({ ...profissional, telefone: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="conselhoprof" className="form-prof-label">
                  Conselho
                </Label>
                <Input
                  type="text"
                  name="conselhoprof"
                  id="conselhoprof"
                  value={profissional.conselho ? profissional.conselho : ""}
                  onChange={e =>
                    setProf({ ...profissional, conselho: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="prof-form-col">
              <FormGroup>
                <Label for="numconselhoprof" className="form-prof-label">
                  Número Conselho
                </Label>
                <Input
                  type="text"
                  name="numconselhoprof"
                  id="numconselhoprof"
                  value={
                    profissional.num_conselho ? profissional.num_conselho : ""
                  }
                  onChange={e =>
                    setProf({ ...profissional, num_conselho: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="btn-prof">
            <Button
              color="primary"
              className="ml-3 mt-2 mb-3"
              onClick={() => save()}
            >
              Salvar
            </Button>
            <Route
              render={({ history }) => (
                <Button
                  color="danger"
                  className="ml-2 mt-2 mb-3"
                  onClick={() => remove(history)}
                >
                  Excluir
                </Button>
              )}
            />
          </div>
        </Form>
      </div>
    </>
  );
}

export default Professional;
