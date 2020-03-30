var Filmes = module.exports
const axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query=" 


Filmes.getLista = async function() {
    var query = `select ?titulo ?duracao ?data ?lingua ?pais ?realizador ?rnome 
    where {
        ?f a c:Filme.
        ?f c:título ?titulo.
        ?f c:duração ?duracao.
        ?f c:dataLançamento ?data.
        ?f c:temLíngua ?l.
        bind(replace(strafter(str(?l), 'cinema#'),"_"," ") AS ?lingua).
        filter(?lingua = 'English')
        ?f c:temPaísOrigem ?p.
        bind(replace(strafter(str(?p), 'cinema#'),"_"," ") AS ?pais).
        ?f c:temRealizador ?realizador.
        ?realizador c:nome ?rnome.
    }`;
    var encoded = encodeURIComponent(prefixes + query);
    try {
      var response = await axios.get(getLink + encoded);
      return response.data;
    } catch (e) {
      throw e;
    }
  };

Filmes.getFilme = async function (idFilme){
    var query =  `select ?f ?titulo ?duracao ?data ?lingua ?pais ?realizador ?rnome 
    where {
        c:${idFilme} rdf:type c:Filme.
        c:${idFilme} c:título ?titulo.
        c:${idFilme} c:duração ?duracao.
        c:${idFilme} c:dataLançamento ?data.
        c:${idFilme} c:temLíngua ?l.
        bind(replace(strafter(str(?l), 'cinema#'),"_"," ") AS ?lingua).
        filter(?lingua = 'English')
        c:${idFilme} c:temPaísOrigem ?p.
        bind(replace(strafter(str(?p), 'cinema#'),"_"," ") AS ?pais).
        c:${idFilme} c:temRealizador ?rnome.
        ?rnome c:nome ?realizador.
    } ` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}


Filmes.getProdutores = async function(idFilme){
    var query =  `select ?pnome where {
        c:${idFilme} rdf:type c:Filme.
        c:${idFilme} c:foiProduzido ?prod.
        bind(replace(strafter(str(?prod), 'cinema#'),"_"," ") AS ?pnome).
       
    }group by ?pnome ` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}

Filmes.getAtores = async function(idFilme){
    var query =  `select ?anome where {
        c:${idFilme} rdf:type c:Filme.
        c:${idFilme} c:temAtor ?ator.
        bind(replace(strafter(str(?ator), 'cinema#'),"_"," ") AS ?anome).
       
    }group by ?anome ` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}


Filmes.getPersonagens = async function(idFilme){
    var query =  `select ?per_nome where {
        c:${idFilme} rdf:type c:Filme.
        c:${idFilme} c:temPersonagem ?p.
        bind(replace(strafter(str(?p), 'cinema#'),"_"," ") AS ?per_nome).
       
    }group by ?per_nome ` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}

Filmes.getGeneros = async function(idFilme){
    var query =  `select ?gen where {
        c:${idFilme} rdf:type c:Filme.
        c:${idFilme} c:temGénero ?g.
        bind(replace(strafter(str(?g), 'cinema#'),"_"," ") AS ?gen).
       
    }group by ?gen ` 
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}

