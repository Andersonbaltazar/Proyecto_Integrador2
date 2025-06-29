package tecsup.edu.pe.integrador_2.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "cultivos")
public class Cultivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private LocalDate fechaSiembra;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties("cultivos")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_terreno_id")
    private TipoTerreno tipoTerreno;

    // Constructores (vacío y con argumentos)
    public Cultivo() {
    }

    public Cultivo(String nombre, LocalDate fechaSiembra, String descripcion, TipoTerreno tipoTerreno, Usuario usuario) {
        this.nombre = nombre;
        this.fechaSiembra = fechaSiembra;
        this.descripcion = descripcion;
        this.tipoTerreno = tipoTerreno;
        this.usuario = usuario;
    }

    // Getters y setters
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

    public LocalDate getFechaSiembra() {
        return fechaSiembra;
    }

    public void setFechaSiembra(LocalDate fechaSiembra) {
        this.fechaSiembra = fechaSiembra;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public TipoTerreno getTipoTerreno() {
        return tipoTerreno;
    }

    public void setTipoTerreno(TipoTerreno tipoTerreno) {
        this.tipoTerreno = tipoTerreno;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}