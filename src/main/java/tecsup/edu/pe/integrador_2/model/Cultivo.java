package tecsup.edu.pe.integrador_2.model;

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
    private String departamento;
    private String distrito;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // Constructores (vacío y con argumentos)
    public Cultivo() {
    }

    public Cultivo(String nombre, LocalDate fechaSiembra, String departamento, String distrito, Usuario usuario) {
        this.nombre = nombre;
        this.fechaSiembra = fechaSiembra;
        this.departamento = departamento;
        this.distrito = distrito;
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

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
