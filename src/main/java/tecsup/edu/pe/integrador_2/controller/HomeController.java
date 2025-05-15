package tecsup.edu.pe.integrador_2.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.Map;

@Controller
public class HomeController {

    private final UsuarioRepository usuarioRepository;

    public HomeController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal OAuth2User principal) {
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
                System.out.println("Usuario guardado: " + usuario.getNombre());
            } else {
                usuario.setUltimoLogin(LocalDateTime.now());
                usuarioRepository.save(usuario);
                System.out.println("Usuario existente, último login actualizado: " + usuario.getNombre());
            }

            model.addAttribute("name", name);
            model.addAttribute("attributes", attributes); // Seguimos pasando los atributos por si los necesitas en la vista
        }
        return "index";
    }
}