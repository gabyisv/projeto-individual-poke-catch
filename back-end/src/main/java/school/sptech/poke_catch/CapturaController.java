package school.sptech.poke_catch;

import org.springframework.context.HierarchicalMessageSource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/capturas")
@CrossOrigin(origins = "*")
public class CapturaController {

    private final JdbcTemplate jdbcTemplate;

    public CapturaController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @GetMapping("/locais")
    public ResponseEntity<List<String>> listarLocais() {
        List lugares = List.of("Pallet Town", "Viridian City");
        return ResponseEntity.status(200).body(lugares);
    }

    @PostMapping
    public ResponseEntity<HistoricoCaptura> salvarCaptura(@RequestBody HistoricoCaptura captura) {
        String sql = "INSERT INTO historico_captura (nome_treinador, apelido_pokemon, nivel_pokemon, data_captura, pokebola_usada, status, imagem_pokemon) VALUES (?,?,?,?,?,?,?)";

        if((captura.getNivelPokemon() < 1 || captura.getNivelPokemon() > 100) || (captura.getNomeTreinador() == null || captura.getNomeTreinador().isBlank())) {
            return ResponseEntity.status(400).build();
        }

        jdbcTemplate.update(sql, captura.getNomeTreinador(), captura.getApelidoPokemon(), captura.getNivelPokemon(), captura.getDataCaptura(), captura.getPokebolaUsada(), captura.getStatus(), captura.getImagemPokemon());

        return ResponseEntity.status(201).body(captura);
    }

    @GetMapping
    public ResponseEntity<List<HistoricoCaptura>> listarCaptura() {
        String sql = "SELECT * FROM historico_captura";

        List<HistoricoCaptura> lista = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(HistoricoCaptura.class));

        return ResponseEntity.status(200).body(lista);
    }

}
