import React, { useState } from "react";
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


import "./Historico.css";

import Api from "../../service/api";

function Historico(props) {
  const {
    match: { params }
  } = props;

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [pSearch, setPSearch] = useState("");

  const columns = [
    {
      dataField: "codigo",
      text: "ID"
    },
    {
      dataField: "cod_pac",
      text: "Paciente"
    },
    {
      dataField: "data",
      text: "Data"
    },
    {
      dataField: "resultado",
      text: "Resultado"
    },
    {
      dataField: "resultado_triagem",
      text: "Resultado Triagem"
    },
    {
      dataField: "resultado_avglobal",
      text: "Resultado Av. Global"
    }
  ];

  async function search(e) {
    e.preventDefault()
    try {
      if (pSearch === "MAN") {
        const response = await Api.get(`/historico/${params.cod_pac}/MAN`);
        setAvaliacoes(response.data);
      } else {
        const response = await Api.get(`/historico/${params.cod_pac}/ASG`);
        setAvaliacoes(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handlepSearch(value){
    setPSearch(value)
    setAvaliacoes([])
  }

  return (
    <>
      <div className="container-hist">
        <div className="header-hist">
          <span>Histórico de Avaliações</span>
        </div>
        <Form className="hist-form">
          <Row className="hist-form-row">
            <Col className="hist-form-col">
              <FormGroup>
                <Label for="buscahist" className="form-hist-label">
                  Avaliação
                </Label>
                <Input
                  type="select"
                  name="buscahist"
                  id="buscahist"
                  value={pSearch}
                  onChange={e => handlepSearch(e.target.value)}
                >
                  <option>Selecionar...</option>
                  <option value="MAN">MAN</option>
                  <option value="ASG">ASG</option>
                </Input>
              </FormGroup>
            </Col>
            <Col className="hist-form-col">
              <Button
                color="primary"
                className="mt-4 mb-3 btn-hist"
                onClick={e => search(e)}
              >
                Buscar
              </Button>
            </Col>
          </Row>
        </Form>
        <Table striped responsive>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.dataField}>{column.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {avaliacoes.map(aval => {
              return (
                <tr key={aval.codigo}>
                  <td>{aval.codigo}</td>
                  <td>{aval.cod_pac}</td>
                  <td>{new Date(aval.data).toLocaleDateString()}</td>
                  <td>
                    {pSearch === "MAN" ? aval.resultado_total : aval.resultado}
                  </td>
                  <td>{pSearch === "MAN" ? aval.resultado_triagem : "-"}</td>
                  <td>{pSearch === "MAN" ? aval.resultado_avglobal : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Historico;
