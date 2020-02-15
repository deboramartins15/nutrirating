const { authSecret } = require("../.env");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const MSG01 = "Usuário não cadastrado";
const MSG02 = "Informe o e-mail e/ou senha";
const MSG03 = "Senha inválida";
const MSG04 = "Sua senha foi enviada por e-mail";
const MSG05 = "E-mail não cadastrado";

//ENCRYPT SENHA
const encryptPassword = pass => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};

module.exports = app => {
  const logon = async (req, res) => {
    try {
      if (!req.body.email || !req.body.senha)
        return res.status(400).send({ error: MSG02 });

      const profissional = await app
        .db("profissional")
        .where({ email: req.body.email })
        .first();

      if (!profissional) return res.status(400).send({ error: MSG01 });

      const isMatch = await bcrypt.compareSync(
        req.body.senha,
        profissional.senha
      );
      if (!isMatch) return res.status(400).send({ error: MSG03 });

      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: profissional.id,
        nome: profissional.nome,
        emai: profissional.email,
        iat: now,
        exp: now + 60 * 60 * 24 * 3
      };

      return res.json({
        ...payload,
        token: jwt.sign(payload, authSecret)
      });
    } catch (err) {
      console.log(err);
    }
  };

  const recuperaSenha = async (req, res) => {
    try {
      if (!req.body.email) return res.status(400).send({ error: MSG02 });

      const profissional = await app
        .db("profissional")
        .where({ email: req.body.email })
        .first();

      if (!profissional) return res.status(400).send({ error: MSG05 });

      const config = {
        service: "gmail",
        auth: {
          user: "nutrirating@gmail.com", //process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
          pass: "150398nutri" //process.env.PASSWORD || '1234' // TODO: your gmail password
        }
      };

      const transporter = nodemailer.createTransport(config);

      const novaSenha = Math.random()
        .toString(36)
        .slice(-10);
      profissional.senha = encryptPassword(novaSenha + "ntr");

      await app
        .db("profissional")
        .update(profissional)
        .where({ cod_profissional: profissional.cod_profissional });

      const mailOptions = {
        from: "nutrirating@gmail.com",
        to: profissional.email,
        subject: "Nova Senha",
        text: "A sua nova senha é " + novaSenha
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        else return res.status(201).send();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { logon, recuperaSenha };
};
