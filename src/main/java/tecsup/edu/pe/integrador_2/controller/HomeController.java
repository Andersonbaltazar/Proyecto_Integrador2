package tecsup.edu.pe.integrador_2.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tecsup.edu.pe.integrador_2.model.Cultivo;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.CultivoRepository;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;
import tecsup.edu.pe.integrador_2.service.GeminiService;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Controller
public class HomeController {

    private final UsuarioRepository usuarioRepository;
    private final GeminiService geminiService;
    private final CultivoRepository cultivoRepository;

    public HomeController(UsuarioRepository usuarioRepository, GeminiService geminiService, CultivoRepository cultivoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.geminiService = geminiService;
        this.cultivoRepository = cultivoRepository;
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

    @GetMapping("/recomendar")
    public String obtenerRecomendacion(@RequestParam(name = "pregunta", required = false) String pregunta,
                                       @RequestParam(name = "cultivoId", required = false) Long cultivoId,
                                       Model model,
                                       @AuthenticationPrincipal OAuth2User principal) {
        model.addAttribute("busquedaRealizada", false); // Inicializamos en falso

        Usuario usuario = null;
        if (principal != null) {
            String googleId = (String) principal.getAttributes().get("sub");
            usuario = usuarioRepository.findByGoogleId(googleId);
            if (usuario != null) {
                List<Cultivo> cultivos = cultivoRepository.findByUsuario(usuario);
                model.addAttribute("cultivos", cultivos);
            }
        }

        Cultivo cultivoSeleccionado = null;
        String recomendacion = null;

        if (cultivoId != null && usuario != null) {
            cultivoSeleccionado = cultivoRepository.findById(cultivoId).orElse(null);
            model.addAttribute("cultivoSeleccionado", cultivoSeleccionado);
            if (pregunta != null && !pregunta.trim().isEmpty() && cultivoSeleccionado != null) {
                // Enriquecer la pregunta (opcional, puedes ajustarlo)
                String contextoCultivo = "Considerando mi cultivo de " + cultivoSeleccionado.getNombre();
                if (cultivoSeleccionado.getFechaSiembra() != null) {
                    contextoCultivo += " sembrado el " + cultivoSeleccionado.getFechaSiembra();
                }
                if (cultivoSeleccionado.getDepartamento() != null && !cultivoSeleccionado.getDepartamento().isEmpty()) {
                    contextoCultivo += " en " + cultivoSeleccionado.getDepartamento();
                }
                pregunta = contextoCultivo + ", " + pregunta;

                recomendacion = geminiService.getAgriculturalRecommendation(pregunta);
                model.addAttribute("recomendacion", recomendacion);
                model.addAttribute("pregunta", pregunta);
                model.addAttribute("busquedaRealizada", true); // Marcamos la búsqueda como realizada
            }
        }

        return "recomendacion";
    }

    @GetMapping("/registrar_cultivo")
    public String mostrarFormularioRegistroCultivo() {
        return "registrar_cultivo";
    }

    @PostMapping("/guardar_cultivo")
    public String guardarCultivo(@RequestParam String nombre,
                                 @RequestParam(required = false) LocalDate fechaSiembra,
                                 @RequestParam(required = false) String departamento,
                                 @RequestParam(required = false) String distrito,
                                 @AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            String googleId = (String) principal.getAttributes().get("sub");
            Usuario usuario = usuarioRepository.findByGoogleId(googleId);
            if (usuario != null) {
                Cultivo cultivo = new Cultivo(nombre, fechaSiembra, departamento, distrito, usuario);
                cultivoRepository.save(cultivo);
                System.out.println("Cultivo guardado: " + cultivo.getNombre() + " para el usuario: " + usuario.getNombre());
                return "redirect:/recomendar"; // Redirigir a la seccion de recomendaciones después de guardar
            }
        }
        return "redirect:/registrar_cultivo?error=usuario_no_encontrado"; // Redirigir con error si no se encuentra el usuario
    }
}