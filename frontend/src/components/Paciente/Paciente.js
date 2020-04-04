import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table
} from "reactstrap";
import Alert from "react-bootstrap/Alert";

import "./Paciente.css";

import Api from "../../service/api";
import MaterialIcon from "material-icons-react";

function Paciente(props) {
  const profissional = useSelector(state => state.Login.profissional);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({
    cod_pac: 0,
    nome: "",
    dt_nasc: "",
    cpf: "",
    sexo: "",
    endereco: "",
    telefone: "",
    diabetes: "",
    demencia: "",
    cod_profissional: profissional.id
  });
  const [msgs, setMsgs] = useState("");

  const columnsPac = [
    {
      dataField: "cod_pac",
      text: "ID"
    },
    {
      dataField: "nome",
      text: "Nome"
    },
    {
      dataField: "cpf",
      text: "CPF"
    },
    {
      dataField: "dt_nasc",
      text: "Dt. Nascimento"
    },
    {
      dataField: "sexo",
      text: "Sexo"
    },
    {
      dataField: "demencia",
      text: "Demência"
    },
    {
      dataField: "diabetes",
      text: "Diabetes"
    },
    {
      dataField: "endereco",
      text: "Endereço"
    },
    {
      dataField: "telefone",
      text: "Telefone"
    },
    {
      dataField: "action",
      text: "Ação"
    }
  ];

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

  async function reset() {
    setPaciente({
      cod_pac: 0,
      nome: "",
      dt_nasc: "",
      cpf: "",
      sexo: "",
      endereco: "",
      telefone: "",
      diabetes: "",
      demencia: "",
      cod_profissional: profissional.id
    });
    fetchData();
  }
  async function save() {
    console.log(paciente);
    const {
      nome,
      dt_nasc,
      cpf,
      sexo,
      endereco,
      telefone,
      diabetes,
      demencia,
      cod_profissional
    } = paciente;
    try {
      if (paciente.cod_pac) {
        await Api.put(`/paciente/${paciente.cod_pac}`, {
          nome,
          dt_nasc,
          cpf,
          sexo,
          endereco,
          telefone,
          diabetes,
          demencia,
          cod_profissional
        });
        setMsgs("Paciente alterado com sucesso !");
      } else {
        await Api.post("paciente", {
          nome,
          dt_nasc,
          cpf,
          sexo,
          endereco,
          telefone,
          diabetes,
          demencia,
          cod_profissional
        });
        setMsgs("Paciente incluído com sucesso !");
      }
      reset();
    } catch (err) {
      console.log(err.data);
      setMsgs(err.data.error);
    }
  }

  async function fetchPaciente(id, e) {
    e.preventDefault();
    try {
      const response = await Api.get(`/paciente/${id}`);

      let dob = new Date(response.data.dt_nasc).toLocaleDateString();
      dob = dob.split("/");
      const data_format = dob[2] + "-" + dob[1] + "-" + dob[0];

      setPaciente(prevPac => ({
        ...prevPac,
        ...response.data,
        dt_nasc: data_format
      }));
    } catch (err) {
      setMsgs(err.data.error);
    }
  }

  return (
    <>
      <div className="msgs-pac">
        {!!msgs && (
          <Alert dismissible variant="info" onClose={() => setMsgs("")}>
            <span>{msgs}</span>
          </Alert>
        )}
      </div>
      <div className="container-pac">
        <div className="header-pac">
          <span>Pacientes</span>
        </div>
        <Form className="pac-form">
          <Row className="pac-form-row">
            <Col className="pac-form-col">
              <FormGroup>
                <Label for="namepac" className="form-pac-label">
                  Nome
                </Label>
                <Input
                  type="text"
                  name="namepac"
                  id="namepac"
                  placeholder="Nome..."
                  value={paciente.nome ? paciente.nome : ""}
                  onChange={e =>
                    setPaciente({ ...paciente, nome: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="pac-form-col">
              <FormGroup>
                <Label for="CPFpac" className="form-pac-label">
                  CPF
                </Label>
                <Input
                  type="text"
                  name="CPFpac"
                  id="CPFpac"
                  placeholder="CPF..."
                  value={paciente.cpf ? paciente.cpf : ""}
                  onChange={e =>
                    setPaciente({ ...paciente, cpf: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="pac-form-col">
              <FormGroup>
                <Label for="dobpac" className="form-pac-label">
                  Data Nascimento
                </Label>
                <Input
                  type="date"
                  name="dobpac"
                  id="dobpac"
                  value={paciente.dt_nasc ? paciente.dt_nasc : ""}
                  onChange={e =>
                    setPaciente({ ...paciente, dt_nasc: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="pac-form-row">
            <Col className="pac-form-col">
              <FormGroup>
                <Label for="sexpac" className="form-pac-label">
                  Sexo
                </Label>
                <Input
                  type="select"
                  name="sexpac"
                  id="sexpac"
                  value={paciente.sexo ? paciente.sexo : ""}
                  onChange={e =>
                    setPaciente({ ...paciente, sexo: e.target.value })
                  }
                >
                  <option>Selecionar...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </Input>
              </FormGroup>
            </Col>
            <Col className="pac-form-col">
              <FormGroup>
                <Label for="demenciapac" className="form-pac-label">
                  Demência
                </Label>
                <Input
                  type="select"
                  name="demenciapac"
                  id="demenciapac"
                  value={paciente.demencia ? paciente.demencia : ""}
                  onChange={e =>
                    setPaciente({ ...paciente, demencia: e.target.value })
                  }
                >
                  <option>Selecionar...</option>
                  <option value="T">Sim</option>
                  <option value="F">Não</option>
                </Input>
              </FormGroup>
            </Col>
            <Col className="pac-form-col">
              <FormGroup>
                <Label for="diabetespac" className="form-pac-label">
                  Diabetes
                </Label>
                <Input
                  type="select"
                  name="diabetespac"
                  id="diabetespac"
                  value={paciente.diabetes ? paciente.diabetes : ""}
                  onChange={e =>
                    setPaciente({ ...paciente, diabetes: e.target.value })
                  }
                >
                  <option>Selecionar...</option>
                  <option value="T">Sim</option>
                  <option value="F">Não</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row className="pac-form-row">
            <Col className="pac-form-col">
              <FormGroup>
                <Label for="enderecopac" className="form-pac-label">
                  Endereço
                </Label>
                <Input
                  type="text"
                  name="enderecopac"
                  id="enderecopac"
                  value={paciente.endereco ? paciente.endereco : ""}
                  onChange={e =>
                    setPaciente({ ...paciente, endereco: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="pac-form-col">
              <FormGroup>
                <Label for="telefonepac" className="form-pac-label">
                  Telefone
                </Label>
                <Input
                  type="text"
                  name="telefonepac"
                  id="telefonepac"
                  value={paciente.telefone ? paciente.telefone : ""}
                  onChange={e =>
                    setPaciente({ ...paciente, telefone: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="btn-pac">
            <Button
              color="primary"
              className="ml-3 mt-2 mb-3"
              onClick={() => save()}
            >
              Salvar
            </Button>
            <Button
              color="secondary"
              className="ml-2 mt-2 mb-3"
              onClick={() => reset()}
            >
              Cancelar
            </Button>
          </div>
        </Form>
        <Table striped responsive>
          <thead>
            <tr>
              {columnsPac.map(column => (
                <th key={column.dataField}>{column.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pacientes.map(pac => {
              return (
                <tr key={pac.cod_pac}>
                  <td>{pac.cod_pac}</td>
                  <td>{pac.nome}</td>
                  <td>{pac.cpf}</td>
                  <td>{new Date(pac.dt_nasc).toLocaleDateString()}</td>
                  <td>
                    {pac.sexo && pac.sexo === "M" ? "Masculino" : "Feminino"}
                  </td>
                  <td>{pac.demencia && pac.demencia === "T" ? "Sim" : "Não"}</td>
                  <td>{pac.diabetes && pac.diabetes === "T" ? "Sim" : "Não"}</td>
                  <td>{pac.endereco}</td>
                  <td>{pac.telefone}</td>
                  <td>
                    <button className="btn-acao">
                      <MaterialIcon
                        icon="edit"
                        color="#007bff"
                        onClick={event => fetchPaciente(pac.cod_pac, event)}
                      />
                    </button>
                    <Link to={`/historico/${pac.cod_pac}`}>
                     
                      <button className="btn-acao">
                        <MaterialIcon
                          icon="history"
                          color="#007bff"
                        />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Paciente;
