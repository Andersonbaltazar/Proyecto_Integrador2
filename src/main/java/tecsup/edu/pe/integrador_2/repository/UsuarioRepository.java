package tecsup.edu.pe.integrador_2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tecsup.edu.pe.integrador_2.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByGoogleId(String googleId);
    Usuario findByEmail(String email);
}