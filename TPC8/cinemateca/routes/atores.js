var express = require('express');
var router = express.Router();
var Atores = require('../controllers/atores')

/* GET home page. */
router.get('/', function(req, res) {
    Atores.getLista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de atores: ${e}`))
});

router.get('/:id', function(req, res) {
    Atores.getAtor(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na apresentação do ator: ${e}`))
  });
  
module.exports = router;

