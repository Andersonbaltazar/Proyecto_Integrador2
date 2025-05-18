package tecsup.edu.pe.integrador_2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tecsup.edu.pe.integrador_2.model.Cultivo;
import tecsup.edu.pe.integrador_2.model.Usuario;

import java.util.List;

public interface CultivoRepository extends JpaRepository<Cultivo, Long> {
    List<Cultivo> findByUsuario(Usuario usuario);
}