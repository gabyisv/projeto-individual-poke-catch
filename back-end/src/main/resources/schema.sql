CREATE TABLE IF NOT EXISTS historico_captura (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_treinador VARCHAR(255),
    apelido_pokemon VARCHAR(255),
    nivel_pokemon INT,
    data_captura DATE,
    pokebola_usada VARCHAR(255),
    status BOOLEAN,
    imagem_pokemon VARCHAR(500)
);