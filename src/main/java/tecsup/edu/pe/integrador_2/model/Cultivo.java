package tecsup.edu.pe.integrador_2.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cultivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String cultivo;

    private LocalDate fechaSiembra;

    private String descripcion;

    private String localidad;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "tipo_terreno_id", nullable = false)
    private TipoTerreno tipoTerreno;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'Activo'")
    private Estado estado = Estado.Activo;

    @OneToMany(mappedBy = "cultivo", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Recomendacion> recomendaciones;

    // Constructor sin argumentos requerido por JPA
    public Cultivo() {}

    // Constructor con todos los parámetros
    public Cultivo(String nombre, String cultivo, LocalDate fechaSiembra, String descripcion,
                   String localidad, Usuario usuario, TipoTerreno tipoTerreno) {
        this.nombre = nombre;
        this.cultivo = cultivo;
        this.fechaSiembra = fechaSiembra;
        this.descripcion = descripcion;
        this.localidad = localidad;
        this.usuario = usuario;
        this.tipoTerreno = tipoTerreno;
        this.estado = Estado.Activo;
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCultivo() {
        return cultivo;
    }

    public void setCultivo(String cultivo) {
        this.cultivo = cultivo;
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

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public TipoTerreno getTipoTerreno() {
        return tipoTerreno;
    }

    public void setTipoTerreno(TipoTerreno tipoTerreno) {
        this.tipoTerreno = tipoTerreno;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public List<Recomendacion> getRecomendaciones() {
        return recomendaciones;
    }

    public void setRecomendaciones(List<Recomendacion> recomendaciones) {
        this.recomendaciones = recomendaciones;
    }
}
