import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "react-bootstrap/Alert";

import './AvaliacaoASG.css';

import Api from "../../../service/api";

export default function AvaliacaoASG() {
  const profissional = useSelector((state) => state.Login.profissional);
  const [paciente, setPaciente] = useState("");
  const [rOnly, setROnly] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [msgs, setMsgs] = useState("");

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
  return (
    <h1>ASG</h1>
  );
}
