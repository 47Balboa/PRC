var express = require('express');
var router = express.Router();
var Personagens = require('../controllers/personagens')


/* GET home page. */
router.get('/', function(req, res, next) {
    Personagens.getLista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de personagens: ${e}`))
});
  
  router.get('/:id', function(req, res, next) {
    Personagens.getPersonagem(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na apresentação da personagem: ${e}`))
});

module.exports = router;