const listaPokemons = [
    { nome: "Pikachu", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
    { nome: "Charmander", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
    { nome: "Bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
    { nome: "Squirtle", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" }
];


const telaInicial = document.getElementById('tela-inicial')
const telaMapa = document.getElementById('tela-mapa')
const telaCaptura = document.getElementById('tela-captura')
const telaResultado = document.getElementById('tela-resultado')
const telaPc = document.getElementById('tela-pc')
const nomeJogador = document.getElementById('nome-jogador')

const btnComecar = document.querySelector('#tela-inicial button')
const btnProcurar = document.querySelector('#tela-mapa button')
const btnLancar = document.querySelector('#tela-captura button')

const btnAbrirPc = document.getElementById('btn-abrir-pc')
const btnVoltarPc = document.getElementById('btn-voltar-mapa-pc')

const btnProcurarMais = document.getElementById('btn-procurar-mais')

telaMapa.style.display = "none";
telaCaptura.style.display = "none";
telaResultado.style.display = "none";
telaPc.style.display = "none";

btnComecar.onclick = function() {
    const nome = document.getElementById('nome-jogador').value;

    const avatarSelecionado = document.querySelector('input[name="avatar"]:checked');

    if (nome == "") {
        alert("Por favor, digite o seu nome de Treinador!");
    } else {
        telaInicial.style.display = "none";
        telaMapa.style.display = "block";

        document.getElementById('img-avatar-mapa').src = avatarSelecionado.value;
        document.getElementById('nome-treinador-mapa').innerText = "Treinador(a) " + nome;
    }
}

btnProcurar.onclick = function() {
    const select = document.getElementById('selecao-mapa')

    if(select.value == null || select.value == "") {
        alert("Por favor, selecione uma cidade válida no mapa.");
    } else {
        telaMapa.style.display = "none";
        telaCaptura.style.display = "block";

        let nivelSorteado = Math.floor(Math.random() * 100) + 1;

        document.getElementById('nivel-pokemon').value = nivelSorteado;

        document.getElementById('apelido-pokemon').value = "";
        document.getElementById('data-captura').value = "";

        document.getElementById('pokebola-padrao').checked = true;

        document.getElementById('paralisado').checked = false;
        document.getElementById('dormindo').checked = false;
        document.getElementById('envenenado').checked = false;
        document.getElementById('queimado').checked = false;
    }

    let indiceSorteado = Math.floor(Math.random() * listaPokemons.length);
    let pokemonEncontrado = listaPokemons[indiceSorteado]; 

    document.getElementById("nome-pokemon-selvagem").innerText = "Um " + pokemonEncontrado.nome + " selvagem apareceu!";
    document.getElementById("img-pokemon-selvagem").src = pokemonEncontrado.img;
}

btnLancar.onclick = function() {
    const apelido = document.getElementById('apelido-pokemon').value
    const nivel = document.getElementById('nivel-pokemon').value
    const data = document.getElementById('data-captura').value

    const pokebolaSelecionada = document.querySelector('input[name="tipoPokebola"]:checked')

    let pokebolaUsada = "pokebola-padrao";

    if(pokebolaSelecionada != null){
        // pega o id da pokebola que ele escolheu e atualiza a variavel
        pokebolaUsada = pokebolaSelecionada.id;
    }


    let statusFinal = false;

    const isParalisado = document.getElementById('paralisado').checked ;
    const isDormindo = document.getElementById('dormindo').checked;
    const isEnvenenado = document.getElementById('envenenado').checked;
    const isQueimado = document.getElementById('queimado').checked;

    if (isParalisado == true){
        statusFinal = true;
    }

    if (isDormindo == true) {
        statusFinal = true;
    }

    if (isEnvenenado == true) {
        statusFinal = true;
    }

    if (isQueimado == true) {
        statusFinal = true;

    }

    let chance = 50;

    if(pokebolaUsada == "great-ball") {
        chance = 70;
    } else if (pokebolaUsada == "ultra-ball"){
        chance == 90;
    }

    if(statusFinal == true) {
        chance = chance + 10 // adiciona mais 10% de bonus se ele estiver paralisado, dormindo
    }

    let roleta = Math.floor(Math.random() * 100) + 1;

    if (roleta > chance) {
        alert("Ah não! O Pokémon escapou e fugiu!");
        
        telaCaptura.style.display = "none";
        telaMapa.style.display = "block";
        
        return; 
    }

    const dadosSalvar ={
        nomeTreinador: nomeJogador.value,
        apelidoPokemon: apelido,
        nivelPokemon: nivel,
        dataCaptura: data,
        pokebolaUsada: pokebolaUsada,
        status: statusFinal,
        imagemPokemon: document.getElementById('img-pokemon-selvagem').src
    }

    fetch("http://localhost:8080/capturas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosSalvar)
    })
    .then(function(resposta ) {
        if(resposta.status == 201) {
            telaCaptura.style.display = "none";
            telaResultado.style.display = "block";

            document.getElementById("res-apelido").innerText = apelido;
            document.getElementById("res-nivel").innerText = nivel;
            document.getElementById("res-pokebola").innerText = pokebolaUsada;
            document.getElementById("img-resultado").src = document.getElementById('img-pokemon-selvagem').src;
        } else if( resposta.status == 400) {
            alert("Erro. Dados inválidos. O nível deve ser entre 1 e 100, e o nome do treinador não pode ser vazio.")
        }
    })


}

btnAbrirPc.onclick = function() {
    telaMapa.style.display = "none";
    telaPc.style.display = "block";

    fetch("http://localhost:8080/capturas")
    .then(function(resposta) {
        return resposta.json(); 
    })
    .then(function(listaCapturas) {
        const container = document.getElementById('container-pokemons');
        container.innerHTML = ""; 

        for (let i = 0; i < listaCapturas.length; i++) {
            let captura = listaCapturas[i];

            container.innerHTML += `
                <div style="border: 2px solid black; margin: 10px; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                    <img src="${captura.imagemPokemon}" width="100">
                    <h3>${captura.apelidoPokemon}</h3>
                    <p><strong>Nível:</strong> ${captura.nivelPokemon}</p>
                    <p><strong>Treinador Original:</strong> ${captura.nomeTreinador}</p>
                    <p><strong>Pokébola:</strong> ${captura.pokebolaUsada}</p>
                </div>
            `;
        }
    });
}

btnVoltarPc.onclick = function() {
    telaPc.style.display = "none";
    telaMapa.style.display = "block";
}

btnProcurarMais.onclick = function(){
    telaResultado.style.display = "none";
    telaMapa.style.display = "block";
}