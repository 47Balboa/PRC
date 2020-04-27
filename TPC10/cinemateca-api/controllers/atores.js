var Atores = module.exports
const axios = require('axios')

function myNormalize(r) {
    return r.results.bindings.map(o =>{
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
        }
        return novo;
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query=" 


Atores.getLista = async function(){
    var query = `select  ?anome ?idAtor ?sexo  where {
        ?at a c:Ator .
        ?at c:nome ?nome.
        optional{ ?at c:sexo ?sexo .}
        bind(strafter(str(?at), 'cinema#') as ?idAtor) .
        bind(strafter(str(?nome), '#') as ?anome) .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Atores.getFilmesDoAtor = async function(idAtor){
    var query = `select ?f ?idFilme ?ftitulo where {
        c:${idAtor} a c:Ator .
        c:${idAtor} c:atuou ?f .
        ?f c:título ?ftitulo .
        bind(strafter(str(?f), 'cinema#') as ?idFilme) .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}
Atores.getPersonagensDoAtor = async function(idAtor){
    var query = `select ?idPersonagem ?pnome where{
        c:${idAtor} a c:Ator .
        c:${idAtor} c:representa ?p .
        ?p c:nome ?personagem .
        bind(strafter(str(?p), 'cinema#') as ?idPersonagem) .
        bind(strafter(str(?personagem), '#') as ?pnome) .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}


async function getAtorAtomica(idAtor){
    var query = `select ?anome ?sexo where {
        c:${idAtor} a c:Ator .
        c:${idAtor} c:nome ?nome .
        c:${idAtor} c:sexo ?sexo .
        bind(strafter(str(?nome), '#') as ?anome) .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Atores.getAtor = async function(idAtor){
    try{
        var atomica = await getAtorAtomica(idAtor)
        var filmes = await Atores.getFilmesDoAtor(idAtor)
        var personagens = await Atores.getPersonagensDoAtor(idAtor)
        var ator = {
          //nome do campo: variável
            info : atomica[0],
            filmes: filmes,
            personagens: personagens
        }
        return ator
    }
    catch(e){
        throw(e)
    } 
}