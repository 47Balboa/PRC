var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX amd: <http://prc.di.uminho.pt/2020/amd#>
`

var getLink = "http://localhost:7200/repositories/amd" + "?query="

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = `select ?tit (count(?part) as ?numPartituras) ?id where {
    ?id rdf:type amd:Obra .
    ?id amd:temPartitura ?part .
    ?id amd:título ?tit
} 

group by ?tit ?id
order by ?tit`
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
    .then(dados => {
      var mydata = []
      mydata = dados.data.results.bindings.map(obra =>{ return {id: obra.id.value.split('#')[1],
                                                        tit: obra.tit.value,
                                                        nparts: obra.numPartituras.value}})
      res.render('index', { obras : mydata });
      
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })
  
});


router.get('/obra/:id', function(req, res){
  var query = `select ?tit ?tipo ?comp  where {
    amd:` + req.params.id + ` amd:título ?tit .
    amd:` + req.params.id + ` amd:tipo ?tipo .
    optional {
      ?c amd:compôs amd:` + req.params.id + ` .
      ?c amd:nome ?comp .
    }
} `

  var query2 = `select ?inst ?voz ?clave ?afinacao where {
    amd:` + req.params.id + ` amd:temPartitura ?part .
    ?part amd:éTocadaPor ?i .
    ?i amd:designação ?inst .
    optional {
      ?part amd:voz ?voz .
    }
    optional {
      ?part amd:clave ?clave .
    }
    optional {
      ?part amd:afinação ?afinacao .
    }
}`

  var encoded = encodeURIComponent(prefixes + query)
  var encoded2 = encodeURIComponent(prefixes + query2)
  axios.get(getLink + encoded)
    .then(dados => {
      axios.get(getLink + encoded2)
        .then(dados2 => {
          var mydata = dados.data.results.bindings.map(obra =>{ 
            var c = ( typeof obra.comp === 'undefined' ) ? '' : obra.comp.value ;
            var a = ( typeof obra.arr === 'undefined' ) ? '' : obra.arr.value ;
            
            return {id: req.params.id, 
                    tit: obra.tit.value,
                    tipo: obra.tipo.value,
                    comp: c,
                    arr: a}})

            

            var partituras = dados2.data.results.bindings.map(part =>{
              
              var v = ( typeof part.voz === 'undefined' ) ? '' : part.voz.value ;
              var cl = ( typeof part.clave === 'undefined' ) ? '' : part.clave.value ;
              var af = ( typeof part.afinacao === 'undefined' ) ? '' : part.afinacao.value ;

              

              return {inst: part.inst.value,
                      voz: v,
                      clave: cl,
                      afinacao: af}})
    
          res.render('obra', { obra : mydata, parts : partituras });
        })
        .catch(erro => {
          res.render('error', {error : erro})
        })
    })
    .catch(erro => {
      res.render('error', {error : erro})
    })
  })



module.exports = router;
  