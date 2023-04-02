const url = "https://pokeapi.co/api/v2/pokemon/";

const fotoPokemon = document.getElementById('poke-photo-value');
const nomePokemon = document.getElementById('poke-name-value');
const habilidadesPokemon = document.getElementById('poke-hab-value');
const formaPokemon = document.getElementById('poke-form-value');
const especiePokemon = document.getElementById('poke-species-value');
const tipoPokemon = document.getElementById('poke-type-value');
const experienciaPokemon = document.getElementById('poke-exp-value');
const alturaPokemon = document.getElementById('poke-heigth-value');

function consultaPokemon(pokemon){  //FUNÇÃO RECEBE COMO PARAMETRO O POKEMON DIGITADO PELO USUÁRIO
    let url_consulta = url + pokemon; //CONFIGURA FUNÇÃO A SER CONSULTADA COM BASE NO POKEMON DIGITADO
    fetch(url_consulta) //CONSULTA
    .then(response => response.json()) // TRANSFORMA DADOS RECEBIDOS EM .JSON
    .then(dados => {ExtraiEexibeDadosRetornadosDaConsulta(dados)})
    .catch(_ => {alert('Pokemon não encontrado: ' + url_consulta)}) // EM CASO DE ERRO REALIZA O PROCEDIMENTO 
    .finally( () => { console.log('Consulta Finalizada')} ); // APÓS FINALIZAR CONSULTA REALIZA O PROCEDIMENTO

}

function ExtraiEexibeDadosRetornadosDaConsulta(dados){
    reiniciarCamposCriados();
    nomePokemon.innerHTML = padronizarSintaxeDeString(dados.name);
    fotoPokemon.src = dados['sprites']['other']['home']['front_default'];
    criarNovoCampo("poke-hab-value", Object.keys(dados.abilities).length, dados);
    formaPokemon.innerHTML = padronizarSintaxeDeString(dados['forms']['0']['name']);
    especiePokemon.innerHTML = padronizarSintaxeDeString(dados['species']['name']);
    experienciaPokemon.innerHTML = dados.base_experience.toString();
    alturaPokemon.innerHTML = dados.height.toString();
    criarNovoCampo("poke-type-value", Object.keys(dados.types).length, dados);
}

function recebePokemonEatribuiURL(){  // ATIVADA AO CLICAR NO BOTÃO
    var inputUser = document.getElementById("input-name-pokemon").value; //RECEBE O POKEMO DIGITADO POR MEIO DO VALOR DO INPUT TEXT
    inputUser = inputUser.toLowerCase(); // TRANSFORMA A STRING DO POKEMON EM MINUSCULO (API NÃO FUNCIONA COM RECEBIMENTO DE PARAMETRO COM LETRA MAIUSCULA)
    consultaPokemon(inputUser); // CHAMA FUNÇÃO A CONSUMIR API
}

function padronizarSintaxeDeString(valor){ // ESTA FUNÇÃO PADRONIZA AS INFORMAÇÕES RECEBIDAS, RECEBENDO STRING EM MINUSCULO E DEIXANDO APENAS PRIMEIRA LETRA MAIUSCULA
    let primeiraLetraMaiuscula = valor.charAt(0).toUpperCase();
    let stringMinuscula = valor.slice(1).toLowerCase();
    return primeiraLetraMaiuscula + stringMinuscula;
}

function criarNovoCampo(div_id, numExec, dados){
    for(let i =0; i<numExec; i++){
        let novoCampo = document.createElement('h3');
        if(div_id == "poke-type-value"){
            novoCampo.className = 'conteudo elementoCriadoType';
            novoCampo.innerHTML = dados['types'][i]['type']['name'];
        }else 
        if(div_id == "poke-hab-value"){
            novoCampo.className = 'conteudo elementoCriadoHab';
            novoCampo.innerHTML = dados['abilities'][i]['ability']['name'];
        }
        document.getElementById(div_id).appendChild(novoCampo);
    }
}

function reiniciarCamposCriados(){
    let elementosHab = document.getElementsByClassName('elementoCriadoHab');

    document.querySelectorAll('.elementoCriadoType').forEach(function(elemento) {
        elemento.remove();
      });
      
      document.querySelectorAll('.elementoCriadoHab').forEach(function(elemento) {
        elemento.remove();
      });
      
}

addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        recebePokemonEatribuiURL();
    }
  });

