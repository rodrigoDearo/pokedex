const url = "https://pokeapi.co/api/v2/pokemon/";

// DEFINE CONSTANTES REFERENTE AOS SEU DETERMINADO ELEMENTO HTML
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
    .catch(_ => {tratativaDeErro()}) // EM CASO DE ERRO REALIZA O PROCEDIMENTO 
    .finally( () => { console.log('Consulta Finalizada para seguinte URL:' + url_consulta)} ); // APÓS FINALIZAR CONSULTA REALIZA O PROCEDIMENTO

}

function tratativaDeErro(){ // DEFINE PADRÃO VISUAL CASO NÃO ENCONTRE O POKÉMON
    document.getElementById('poke-info').style.borderRadius = '5em'
    document.getElementById('poke-info').style.overflow = 'hidden';             
    document.getElementById('poke-info').style.maxHeight = '45vh';
    document.getElementById('visible').style.visibility = 'hidden';
    nomePokemon.innerHTML = 'Quem é esse Pokémon?';
    fotoPokemon.src = 'img/pokeball.png';
    console.log('Erro, não foi obtido retorno para URL informada');
}

// FUNÇÃO QUE EXIBE OS DADOS DO JSON E REALIZA MUNDAÇAS VISUAIS
function ExtraiEexibeDadosRetornadosDaConsulta(dados){
    document.getElementById('poke-info').style.borderRadius = '5em 0em 0em 5em'
    document.getElementById('poke-info').style.overflow = 'scroll';             
    document.getElementById('poke-info').style.maxHeight = '85vh';
    document.getElementById('visible').style.visibility = 'visible';
    reiniciarCamposCriados();  //ZERA OS CAMPOS CRIADOS DINAMICAMENTE
    nomePokemon.innerHTML = padronizarSintaxeDeString(dados.name); //ESCREVE O NOME DO POKEMON
    fotoPokemon.src = dados['sprites']['other']['home']['front_default'];  //PUXA A FOTO DO POKEMON
    fotoPokemon.style.backgroundColor = '#ececed';  
    criarNovoCampo("poke-hab-value", Object.keys(dados.abilities).length, dados); //CRIA CAMPO DINAMICANTE, ENVIANDO NUMERO DE HABILIDADES, DIV E DADOS.JSON
    formaPokemon.innerHTML = padronizarSintaxeDeString(dados['forms']['0']['name']); // ESCREVE FORMA
    especiePokemon.innerHTML = padronizarSintaxeDeString(dados['species']['name']);  //ESCREVE ESPECIE 
    experienciaPokemon.innerHTML = dados.base_experience.toString();  // ESCREVE A EXPERIENCIA APÓS TRANSFORMAR NUMBER EM STRING
    alturaPokemon.innerHTML = dados.height.toString();  //ESCRE A ALTURA, APÓS TRANSFORMA O NUMBER EM STRING
    criarNovoCampo("poke-type-value", Object.keys(dados.types).length, dados);  //CRIA CAMPO DINAMICANTE, ENVIANDO NUMERO DE TIPOS, DIV E DADOS.JSON
}

function recebePokemonEatribuiURL(){  // ATIVADA AO CLICAR NO BOTÃO
    var inputUser = document.getElementById("input-name-pokemon").value; //RECEBE O POKEMO DIGITADO POR MEIO DO VALOR DO INPUT TEXT
    inputUser = inputUser.toLowerCase(); // TRANSFORMA A STRING DO POKEMON EM MINUSCULO (API NÃO FUNCIONA COM RECEBIMENTO DE PARAMETRO COM LETRA MAIUSCULA)
    consultaPokemon(inputUser); // CHAMA FUNÇÃO A CONSUMIR API
}

function padronizarSintaxeDeString(valor){ // ESTA FUNÇÃO PADRONIZA AS INFORMAÇÕES RECEBIDAS, RECEBENDO STRING EM MINUSCULO E DEIXANDO APENAS PRIMEIRA LETRA MAIUSCULA
    let primeiraLetraMaiuscula = valor.charAt(0).toUpperCase();  //PEGA PRIMEIRA LETRA E A GUARDA COMO MAIUSCULA
    let stringMinuscula = valor.slice(1).toLowerCase();  //GUARDA RESTANTE DA PALAVRA EM MINUSCULO
    return primeiraLetraMaiuscula + stringMinuscula;  //JUNTA PRIMEIRA LETRA MAIUSCULA COM RESTANTE MINUSCULO
}

function criarNovoCampo(div_id, numExec, dados){  //CRIA NOVO CAMPO, RECEEBENDO A DIV EM QUE VAI SER COLOCADO, O NUMERO DE CAMPOS A SEREM CRIADOS E OS DADOS.JSON
    for(let i =0; i<numExec; i++){
        let novoCampo = document.createElement('h3'); // CRIA ELEMENTO H3
        if(div_id == "poke-type-value"){  // VERIFICA QUAL CAMPO SERÁ CADASTRADO PARA ALTERAR CAMININHO DE PROCURA E NOMEAÇÃO DE CLASSE
            novoCampo.className = 'conteudo elementoCriadoType'; //ADICIONA CLASSES AO ELEMENTO
            novoCampo.innerHTML = padronizarSintaxeDeString(dados['types'][i]['type']['name']);  // ESCREVE TIPO
        }else 
        if(div_id == "poke-hab-value"){
            novoCampo.className = 'conteudo elementoCriadoHab';
            novoCampo.innerHTML = padronizarSintaxeDeString(dados['abilities'][i]['ability']['name']);
        }
        document.getElementById(div_id).appendChild(novoCampo); //ADD O ELEMENTRO CRIADO ACIMA NA DIV RECEBIDA COMO PARAMETRO
    }
}

function reiniciarCamposCriados(){
    //SELECIONA TODOS ELEMENTOS DE CLASSE X E REMOVE

    document.querySelectorAll('.elementoCriadoType').forEach(function(elemento) { 
        elemento.remove();
      });
      
      document.querySelectorAll('.elementoCriadoHab').forEach(function(elemento) {
        elemento.remove();
      });
      
}

addEventListener('keypress', function(event) { //FUNÇÃO DE ATALHO PARA TECLA ENTER
    if (event.key === 'Enter') {
        recebePokemonEatribuiURL();
    }
  });

  /*
        CÓDIGO DESENVOLVIDO E COMENTADO POR RODRIGO DEARO
  */ 

