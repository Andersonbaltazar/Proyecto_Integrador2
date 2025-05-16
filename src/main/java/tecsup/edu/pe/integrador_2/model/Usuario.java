package tecsup.edu.pe.integrador_2.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID interno de nuestra base de datos

    @Column(name = "google_id", unique = true)
    private String googleId;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "nombre_pila")
    private String nombrePila;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "email_verificado")
    private Boolean emailVerificado;

    @Column(name = "foto_perfil_url", length = 500)
    private String fotoPerfilUrl;

    @Column(name = "dominio_hd")
    private String dominioHd;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "ultimo_login")
    private LocalDateTime ultimoLogin;

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombrePila() {
        return nombrePila;
    }

    public void setNombrePila(String nombrePila) {
        this.nombrePila = nombrePila;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEmailVerificado() {
        return emailVerificado;
    }

    public void setEmailVerificado(Boolean emailVerificado) {
        this.emailVerificado = emailVerificado;
    }

    public String getFotoPerfilUrl() {
        return fotoPerfilUrl;
    }

    public void setFotoPerfilUrl(String fotoPerfilUrl) {
        this.fotoPerfilUrl = fotoPerfilUrl;
    }

    public String getDominioHd() {
        return dominioHd;
    }

    public void setDominioHd(String dominioHd) {
        this.dominioHd = dominioHd;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    @PrePersist
    public void setFechaCreacion() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public LocalDateTime getUltimoLogin() {
        return ultimoLogin;
    }

    public void setUltimoLogin(LocalDateTime ultimoLogin) {
        this.ultimoLogin = ultimoLogin;
    }

    @PreUpdate
    public void setUltimoLogin() {
        this.ultimoLogin = LocalDateTime.now();
    }
}