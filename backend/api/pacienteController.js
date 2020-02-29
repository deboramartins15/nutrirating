const MSG01 = "Paciente inserido com sucesso";
const MSG02 = "Paciente já cadastrado";
const MSG03 = "Campos obrigatórios em branco,favor conferir";

const MSG_UPD01 = "Paciente alterado com sucesso";
const MSG_UPD02 = "O campo cpf não pode ser alterado";

module.exports = app => {
  const save = async (req, res) => {
    const paciente = {
      cod_pac: 0,
      nome: req.body.nome,
      dt_nasc: req.body.dt_nasc,
      cpf: req.body.cpf,
      sexo: req.body.sexo,
      endereco: req.body.endereco,
      telefone: req.body.telefone,
      diabetes: req.body.diabetes,
      demencia: req.body.demencia,
      cod_profissional: req.body.cod_profissional
    };

    if (req.params.id) paciente.cod_pac = req.params.id;

    console.log(paciente.cod_pac)

    try {
      if (!paciente.nome || !paciente.cpf || !paciente.dt_nasc)
        return res.status(400).send({ error: MSG03 });

      const exits = await app
        .db("paciente")
        .where("cpf", paciente.cpf)
        .first();

      if (paciente.cod_pac) {
        //UPDATE        
        app
          .db("paciente")
          .update(paciente)
          .where({ cod_pac: paciente.cod_pac })
          .then(_ => res.status(200).send({ success: MSG_UPD01 }))
          .catch(err => res.status(500).send(err));
      } else {
        //INSERT

        if (exits) return res.status(400).send({ error: MSG02 });

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

        app
          .db("paciente")
          .insert({
            nome,
            dt_nasc,
            cpf,
            sexo,
            endereco,
            telefone,
            diabetes,
            demencia,
            cod_profissional
          })
          .then(_ => res.status(200).send({ success: MSG01 }))
          .catch(err => res.status(500).send(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getById = async (req, res) => {
    app
      .db("paciente")
      .select(
        "cod_pac",
        "nome",
        "dt_nasc",
        "cpf",
        "sexo",
        "endereco",
        "telefone",
        "diabetes",
        "demencia",
        "cod_profissional"
      )
      .where({ cod_pac: req.params.id })
      .first()
      .then(paciente => res.json(paciente))
      .catch(err => res.status(500).send(err));
  };

  return { save, getById };
};
