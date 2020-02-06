const MSG01 = "Dados obrigatórios em branco,favor conferir";
const MSG02 = "Informe o paciente";

module.exports = app => {
  const save = async (req, res) => {
    const asg = {
      cod_pac: req.body.cod_pac,
      resultado: req.body.resultado,
      peso: {
        peso_anterior: req.body.peso.peso_anterior,
        peso_atual: req.body.peso.peso_atual,
        perda_peso: req.body.peso.perda_peso,
        mudanca_peso: req.body.peso.mudanca_peso
      },
      ingestao_alimentar: {
        sem_mudanca: req.body.ingestao_alimentar.sem_mudanca,
        mudanca: req.body.ingestao_alimentar.mudanca,
        tempo_mudanca: req.body.ingestao_alimentar.tempo_mudanca,
        tipo_dieta: req.body.ingestao_alimentar.tipo_dieta
      },
      sint_gastroint: {
        nenhum: req.body.sint_gastroint.nenhum,
        nausea: req.body.sint_gastroint.nausea,
        vomito: req.body.sint_gastroint.vomito,
        diarreia: req.body.sint_gastroint.diarreia,
        anorexia: req.body.sint_gastroint.anorexia,
        duracao: req.body.sint_gastroint.duracao
      },
      capac_func: {
        sem_alteracao: req.body.capac_func.sem_alteracao,
        alteracao: req.body.capac_func.alteracao,
        tempo_alteracao: req.body.capac_func.tempo_alteracao,
        duracao: req.body.capac_func.duracao
      },
      doenc_comorb: {
        diag_principal: req.body.doenc_comorb.diag_principal,
        requerimento: req.body.doenc_comorb.requerimento,
        stress_metabol: req.body.doenc_comorb.stress_metabol
      },
      exame_fisico: {
        red_gord_subcut: req.body.exame_fisico.red_gord_subcut,
        perda_muscular: req.body.exame_fisico.perda_muscular,
        edema: req.body.exame_fisico.edema,
        ascite: req.body.exame_fisico.ascite
      }
    };

    const insereP = p => {
      if (
        p.peso_anterior == "" ||
        p.peso_atual == "" ||
        p.perda_peso == "" ||
        p.mudanca_peso == ""
      )
        return false;

      const { peso_anterior, peso_atual, perda_peso, mudanca_peso } = p;

      app
        .db("peso")
        .insert({ peso_anterior, peso_atual, perda_peso, mudanca_peso });

      return true;
    };

    const insereIA = IA => {
      if (
        IA.sem_mudanca == "" ||
        IA.mudanca == "" ||
        IA.tempo_mudanca == "" ||
        IA.tipo_dieta == ""
      )
        return false;

      const { sem_mudanca, mudanca, tempo_mudanca, tipo_dieta } = IA;

      app
        .db("ingestao_alimentar")
        .insert({ sem_mudanca, mudanca, tempo_mudanca, tipo_dieta });

      return true;
    };

    const insereSG = SG => {
      if (
        SG.nenhum == "" ||
        SG.nausea == "" ||
        SG.vomito == "" ||
        SG.diarreia == "" ||
        SG.anorexia == "" ||
        SG.duracao === ""
      )
        return false;

      const { nenhum, nausea, vomito, diarreia, anorexia, duracao } = SG;

      app
        .db("sintomas_gastroint")
        .insert({ nenhum, nausea, vomito, diarreia, anorexia, duracao });

      return true;
    };

    const insereCF = CF => {
      if (
        CF.sem_alteracao == "" ||
        CF.alteracao == "" ||
        CF.tempo_alteracao == "" ||
        CF.duracao === ""
      )
        return false;

      const { sem_alteracao, alteracao, tempo_alteracao, duracao } = CF;

      app
        .db("cap_funcional")
        .insert({ sem_alteracao, alteracao, tempo_alteracao, duracao });

      return true;
    };

    const insereDC = DC => {
      if (
        DC.diag_principal == "" ||
        DC.requerimento == "" ||
        DC.stress_metabol == ""
      )
        return false;

      const { diag_principal, requerimento, stress_metabol } = DC;

      app
        .db("doencas_comorbidades")
        .insert({ diag_principal, requerimento, stress_metabol });

      return true;
    };

    const insereEF = EF => {
      if (
        EF.red_gord_subcut == "" ||
        EF.perda_muscular == "" ||
        EF.edema == "" ||
        EF.ascite == ""
      )
        return false;

      const { red_gord_subcut, perda_muscular, edema, ascite } = EF;

      app
        .db("exame_fisico")
        .insert({ red_gord_subcut, perda_muscular, edema, ascite });

      return true;
    };

    try {
      if (!asg.cod_pac) return res.status(400).send({ error: MSG02 });
      if (!asg.resultado) return res.status(400).send({ error: MSG01 });

      if (
        insereP(asg.peso) &&
        insereIA(asg.ingestao_alimentar) &&
        insereSG(asg.sint_gastroint) &&
        insereCF(asg.capac_func) &&
        insereDC(asg.doenc_comorb) &&
        insereEF(asg.exame_fisico)
      ) {
        let resultado = asg.resultado;
        let cod_pac = asg.cod_pac;

        let cod_peso = await app
          .db("peso")
          .max("codigo")
          .first();
        cod_peso = cod_peso.max;

        let cod_ia = await app
          .db("ingestao_alimentar")
          .max("codigo")
          .first();
        cod_ia = cod_ia.max;

        let cod_sg = await app
          .db("sintomas_gastroint")
          .max("codigo")
          .first();
        cod_sg = cod_sg.max;

        let cod_cf = await app
          .db("cap_funcional")
          .max("codigo")
          .first();
        cod_cf = cod_cf.max;

        let cod_ef = await app
          .db("exame_fisico")
          .max("codigo")
          .first();
        cod_ef = cod_ef.max;

        let cod_dc = await app
          .db("doencas_comorbidades")
          .max("codigo")
          .first();
        cod_dc = cod_dc.max;

        app
          .db("asg")
          .insert({
            resultado,
            cod_pac,
            cod_peso,
            cod_ia,
            cod_sg,
            cod_cf,
            cod_ef,
            cod_dc
          })
          .then(_ => res.status(200).send({ resultado }))
          .catch(err => res.status(500).send(err));
      } else return res.status(400).send({ error: MSG01 });
    } catch (err) {
      console.log(err);
    }
  };

  return { save };
};
