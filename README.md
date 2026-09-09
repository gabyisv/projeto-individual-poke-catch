# ⚡ Poke-Catch

## 🛠️ Tecnologias Utilizadas

**Front-end:**
* HTML5, CSS3 e JavaScript (Vanilla)
* DOM Manipulation 
* Fetch API 

**Back-end:**
* Java 21
* Spring Boot 
* Spring JDBC Template
* Banco de Dados SQL

---

## 📡 Como o Cliente se Comunica com a API

A arquitetura do projeto segue o modelo **Client-Server**. O Front-end (Cliente) se comunica com a API RESTful construída em Spring Boot (Servidor) através do formato **JSON**, utilizando a **Fetch API** nativa do JavaScript.

A API possui o recurso base `/capturas` rodando na porta local `8080`, expondo as seguintes rotas:

1. **Salvar Captura (POST):**
   * Ao lançar a Pokébola e capturar o Pokémon, o Front-end coleta os dados do formulário e cria um objeto JSON.
   * O JavaScript faz um `fetch("http://localhost:8080/capturas", { method: "POST", ... })` enviando os dados (nome do treinador, apelido, nível, etc.).
   * O Spring Boot recebe esse JSON, mapeia para a classe Java (`HistoricoCaptura`) e o `jdbcTemplate` salva no banco de dados, retornando o status `201 (Created)`.

2. **Listar Pokémon no PC (GET):**
   * Ao clicar no botão "Abrir PC", o Front-end faz um `fetch("http://localhost:8080/capturas")`.
   * A API executa um `SELECT` no banco de dados e devolve um Array de objetos JSON contendo todos os Pokémon capturados.
   * O JavaScript itera sobre essa lista com um laço `for` e desenha os cards dinamicamente na tela do usuário.

---
