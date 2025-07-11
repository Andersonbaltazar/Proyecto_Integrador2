package tecsup.edu.pe.integrador_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;

import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/api/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Map.of("authenticated", false);
        }

        // Obtener datos
        String googleId = principal.getAttribute("sub");
        String email = principal.getAttribute("email");
        String nombre = principal.getAttribute("name");
        String nombrePila = principal.getAttribute("given_name");
        String apellido = principal.getAttribute("family_name");
        String foto = principal.getAttribute("picture");
        String dominio = principal.getAttribute("hd");

        // Buscar usuario por Google ID
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);

        // Si no existe, lo creamos
        if (usuario == null) {
            usuario = new Usuario();
            usuario.setGoogleId(googleId);
            usuario.setEmail(email);
            usuario.setNombre(nombre);
            usuario.setNombrePila(nombrePila);
            usuario.setApellido(apellido);
            usuario.setFotoPerfilUrl(foto);
            usuario.setDominioHd(dominio);
            usuarioRepository.save(usuario);
        }

        return Map.of(
                "authenticated", true,
                "name", nombre,
                "first_name", nombrePila,
                "last_name", apellido,
                "email", email,
                "picture", foto
        );
    }

    @PutMapping("/api/user")
    public ResponseEntity<?> actualizarUsuario(
            @AuthenticationPrincipal OAuth2User principal,
            @RequestBody Map<String, Object> payload) {

        if (principal == null) {
            return ResponseEntity.status(401).body("No autorizado.");
        }

        String googleId = principal.getAttribute("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        if (payload.containsKey("first_name")) {
            usuario.setNombrePila((String) payload.get("first_name"));
        }

        if (payload.containsKey("last_name")) {
            usuario.setApellido((String) payload.get("last_name"));
        }

        if (payload.containsKey("picture")) {
            usuario.setFotoPerfilUrl((String) payload.get("picture"));
        }

        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuario actualizado exitosamente.");
    }
}
