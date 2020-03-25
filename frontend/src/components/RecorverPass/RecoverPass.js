import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "react-bootstrap/Alert";

import "./RecoverPass.css";

import Api from "../../service/api";

function RecoverPass(props) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function recovery_pass(history) {
    try {
      await Api.post("forgot-pass", { email });
      setMsg("Email enviado com sucesso!");
      history.push("/login");
    } catch (response) {
      setMsg("Erro ao enviar o email!");
    }
  }

  return (
    <>
    <div className="msgs-rec">
      {!!msg && (
        <Alert
          dismissible
          variant="danger"
          onClose={() => setMsg("")}
        >
          <span>{msg}</span>
        </Alert>
      )}
      </div>
      <div className="container-rec">
        <div className="header-rec">
          <span>Recuperação de Senha</span>
        </div>
        <Form className="rec-form">
          <Row className="rec-form-row">
            <Col className="rec-form-col">
              <FormGroup>
                <Label for="emailrec" className="form-rec-label">
                  Email
                </Label>
                <Input
                  type="text"
                  name="emailrec"
                  id="emailrec"
                  placeholder="Email..."
                  onChange={t => setEmail(t.target.value)}
                />
              </FormGroup>
              <Route
                render={({ history }) => (
                  <Button
                    color="primary"
                    className="ml-2 mt-2 mb-3"
                    onClick={() => recovery_pass(history)}
                  >
                    Recuperar
                  </Button>
                )}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default RecoverPass;
