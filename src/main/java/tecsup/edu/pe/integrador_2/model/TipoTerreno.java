package tecsup.edu.pe.integrador_2.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipos_terreno")
public class TipoTerreno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    public TipoTerreno() {
    }

    public TipoTerreno(String nombre) {
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}