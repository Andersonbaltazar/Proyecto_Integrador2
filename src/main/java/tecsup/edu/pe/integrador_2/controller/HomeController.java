package tecsup.edu.pe.integrador_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public HomeController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/")
    public Map<String, Object> home(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> resp = new HashMap<>();
        if (principal != null) {
            Map<String, Object> attributes = principal.getAttributes();
            String googleId = (String) attributes.get("sub");
            String email = (String) attributes.get("email");
            String name = (String) attributes.get("name");
            Boolean emailVerified = (Boolean) attributes.get("email_verified");
            String picture = (String) attributes.get("picture");
            String givenName = (String) attributes.get("given_name");
            String familyName = (String) attributes.get("family_name");
            String hd = (String) attributes.get("hd");
            Usuario usuario = usuarioRepository.findByGoogleId(googleId);

            if (usuario == null) {
                usuario = new Usuario();
                usuario.setGoogleId(googleId);
                usuario.setEmail(email);
                usuario.setNombre(name);
                usuario.setEmailVerificado(emailVerified);
                usuario.setFotoPerfilUrl(picture);
                usuario.setNombrePila(givenName);
                usuario.setApellido(familyName);
                usuario.setDominioHd(hd);
                usuario.setUltimoLogin(LocalDateTime.now());
                usuarioRepository.save(usuario);
                resp.put("msg", "Usuario guardado");
            } else {
                usuario.setUltimoLogin(LocalDateTime.now());
                usuarioRepository.save(usuario);
                resp.put("msg", "Usuario existente, último login actualizado");
            }
            resp.put("name", name);
            resp.put("attributes", attributes);
        } else {
            resp.put("msg", "No autenticado");
        }
        return resp;
    }
}