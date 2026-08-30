package school.sptech.poke_catch;

import java.time.LocalDate;

public class HistoricoCaptura {
    private Integer id;
    private String nomeTreinador;
    private String apelidoPokemon;
    private Integer nivelPokemon;
    private LocalDate dataCaptura;
    private String pokebolaUsada;
    private Boolean status;
    private String imagemPokemon;

    public HistoricoCaptura() {
    }

    public HistoricoCaptura(Integer id, String nomeTreinador, String apelidoPokemon, Integer nivelPokemon, LocalDate dataCaptura, String pokebolaUsada, Boolean status, String imagemPokemon) {
        this.id = id;
        this.nomeTreinador = nomeTreinador;
        this.apelidoPokemon = apelidoPokemon;
        this.nivelPokemon = nivelPokemon;
        this.dataCaptura = dataCaptura;
        this.pokebolaUsada = pokebolaUsada;
        this.status = status;
        this.imagemPokemon = imagemPokemon;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomeTreinador() {
        return nomeTreinador;
    }

    public void setNomeTreinador(String nomeTreinador) {
        this.nomeTreinador = nomeTreinador;
    }

    public String getApelidoPokemon() {
        return apelidoPokemon;
    }

    public void setApelidoPokemon(String apelidoPokemon) {
        this.apelidoPokemon = apelidoPokemon;
    }

    public Integer getNivelPokemon() {
        return nivelPokemon;
    }

    public void setNivelPokemon(Integer nivelPokemon) {
        this.nivelPokemon = nivelPokemon;
    }

    public LocalDate getDataCaptura() {
        return dataCaptura;
    }

    public void setDataCaptura(LocalDate dataCaptura) {
        this.dataCaptura = dataCaptura;
    }

    public String getPokebolaUsada() {
        return pokebolaUsada;
    }

    public void setPokebolaUsada(String pokebolaUsada) {
        this.pokebolaUsada = pokebolaUsada;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getImagemPokemon() {
        return imagemPokemon;
    }

    public void setImagemPokemon(String imagemPokemon) {
        this.imagemPokemon = imagemPokemon;
    }
}
