const bcrypt = require("bcryptjs");

const MSG01 = "Campos obrigatórios em branco.Favor conferir";
const MSG02 = "E-mail já cadastrado";
const MSG03 = "A senha deve ter no mínimo 8 dígitos alfanuméricos";
const MSG04 = "Senha e confirmação da senha não conferem";

const MSG_UPD01 = "Usuário alterado com sucesso";

const MSG_DEL01 = "Usuário excluído";
const MSG_DEL02 = "Usuário possui pacientes cadastrados. Impossível excluir";

//ENCRYPT SENHA
const encryptPassword = pass => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};

module.exports = app => {
  const save = async (req, res) => {
    const profissional = {
      cod_profissional: 0,
      nome: req.body.nome,
      email: req.body.email,
      dt_nasc: req.body.dt_nasc,
      senha: req.body.senha,
      confirmacao_senha: req.body.conf_senha,
      sexo: req.body.sexo,
      telefone: req.body.telefone,
      conselho: req.body.conselho,
      num_conselho: req.body.crm_crn
    };

    if (req.params.id) {
      profissional.cod_profissional = req.params.id;
    }

    try {
      if (
        !profissional.nome ||
        !profissional.email ||
        !profissional.num_conselho ||
        !profissional.senha ||
        !profissional.confirmacao_senha
      )
        return res.status(400).send({ error: MSG01 });

      if (profissional.senha.length < 8)
        return res.status(400).send({ error: MSG03 });

      if (profissional.senha != profissional.confirmacao_senha)
        return res.status(400).send({ error: MSG04 });

      const fetchDB = await app
        .db("profissional")
        .where("email", profissional.email)
        .first();

      if (fetchDB) return res.status(400).send({ error: MSG02 });

      if (profissional.cod_profissional) {
        //UPDATE
        app
          .db("profissional")
          .update(profissional)
          .where({ cod_profissional: profissional.cod_profissional })
          .then(_ => res.status(200).send({ success: MSG_UPD01 }))
          .catch(err => res.status(500).send(err));
      } else {
        //INSERT
        profissional.senha = encryptPassword(profissional.senha);
        profissional.confirmacao_senha = encryptPassword(profissional.senha);

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

        app
          .db("profissional")
          .insert({
            nome,
            email,
            dt_nasc,
            senha,
            confirmacao_senha,
            sexo,
            telefone,
            conselho,
            num_conselho
          })
          .then(_ => res.status(201).send())
          .catch(err => res.status(500).send(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (req, res) => {
    const cod_profissional = req.body.id;

    const hasPacient = await app
      .db("paciente")
      .where("cod_profissional", cod_profissional)
      .first();

    if (hasPacient) return res.status(400).send({ error: MSG_DEL02 });

    app
      .db("profissional")
      .where("cod_profissional", cod_profissional)
      .del()
      .then(_ => res.status(200).send({ success: MSG_DEL01 }))
      .catch(err => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    app
      .db("profissional")
      .select(
        "cod_profissional",
        "nome",
        "email",
        "dt_nasc",
        "senha",
        "confirmacao_senha",
        "sexo",
        "telefone",
        "conselho",
        "num_conselho"
      )
      .where({ cod_profissional: req.params.id })
      .first()
      .then(profissional => res.json(profissional))
      .catch(err => res.status(500).send(err));
  };

  return { save, remove, getById };
};
