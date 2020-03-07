import React,{ useState } from "react";
import { Route } from "react-router-dom";

import "./RecoverPass.css";

import Api from "../../service/api";

function RecoverPass(props) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function recovery_pass(history) {
    try {
      await Api.post("forgot-pass",{email});
      setMsg("Email enviado com sucesso!")
      history.push("/login")
    } catch (response) {
        setMsg("Erro ao enviar o email!")
    }
  }

  return (
    <>
      <div className="container-recovery">
      {!!msg && <span className="alert alert-danger above" role="alert">{msg}</span>}
        <div className="form-recovery">
          <span>Informe o email para recuperar a senha</span>
          <input
            className="input-recovery"
            type="text"
            placeholder="Email"
            onChange={t => setEmail(t.target.value)}
          ></input>
          <Route
            render={({ history }) => (
              <button
                className="btnPrimary"
                onClick={() => recovery_pass(history)}
              >
                Recuperar
              </button>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default RecoverPass;
