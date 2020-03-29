module.exports = app => {
  const get = async (req, res) => {
    const avaliacao = {
      tipo: req.params.tipo,
      cod_pac: req.params.pac
    };

    if (avaliacao.tipo == "MAN") {
      app
        .db("man")
        .select(
          "codigo",
          "data",
          "resultado_total",
          "resultado_triagem",
          "resultado_avglobal",
          "cod_pac"
        )
        .where({ cod_pac: avaliacao.cod_pac })
        .then(historico => res.json(historico))
        .catch(err => res.status(500).send(err));
    } else if (avaliacao.tipo == "ASG") {
      app
        .db("asg")
        .select("codigo", "data", "resultado", "cod_pac")
        .where({ cod_pac: avaliacao.cod_pac })        
        .then(historico => res.json(historico))
        .catch(err => res.status(500).send(err));
    }
  };

  const getById = async (req, res) => {
    const avaliacao = {
      tipo: req.params.tipo,
      cod_pac: req.params.pac,
      cod_av: req.params.av
    };

    if (avaliacao.tipo == "MAN") {
      app
        .db("man")
        .select(
          "codigo",
          "data",
          "resultado_total",
          "resultado_triagem",
          "resultado_avglobal",
          "cod_pac"
        )
        .where({ cod_pac: avaliacao.cod_pac, codigo: avaliacao.cod_av })
        .first()        
        .then(historico => res.json(historico))
        .catch(err => res.status(500).send(err));
    } else if (avaliacao.tipo == "ASG") {
      app
        .db("asg")
        .select("codigo", "data", "resultado", "cod_pac")
        .where({ cod_pac: avaliacao.cod_pac, codigo: historico.cod_av })
        .first()
        .then(historico => res.json(historico))
        .catch(err => res.status(500).send(err));
    }
  };

  return { get, getById };
};
