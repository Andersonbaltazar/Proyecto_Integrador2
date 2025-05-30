package tecsup.edu.pe.integrador_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tecsup.edu.pe.integrador_2.model.Cultivo;
import tecsup.edu.pe.integrador_2.model.TipoTerreno;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.CultivoRepository;
import tecsup.edu.pe.integrador_2.repository.TipoTerrenoRepository;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;
import tecsup.edu.pe.integrador_2.service.GeminiService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

    private final UsuarioRepository usuarioRepository;
    private final GeminiService geminiService;
    private final CultivoRepository cultivoRepository;
    private final TipoTerrenoRepository tipoTerrenoRepository; // Necesitamos el repositorio de TipoTerreno

    @Autowired
    public HomeController(UsuarioRepository usuarioRepository, GeminiService geminiService, CultivoRepository cultivoRepository, TipoTerrenoRepository tipoTerrenoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.geminiService = geminiService;
        this.cultivoRepository = cultivoRepository;
        this.tipoTerrenoRepository = tipoTerrenoRepository;
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
                                       @RequestParam(name = "userContext", required = false) String userContext,
                                       Model model,
                                       @AuthenticationPrincipal OAuth2User principal) {
        model.addAttribute("busquedaRealizada", false);
        Cultivo cultivoSeleccionado = null;

        Usuario usuario = null;
        if (principal != null) {
            String googleId = (String) principal.getAttributes().get("sub");
            usuario = usuarioRepository.findByGoogleId(googleId);
            if (usuario != null) {
                List<Cultivo> cultivos = cultivoRepository.findByUsuario(usuario);
                model.addAttribute("cultivos", cultivos);
                if (cultivoId != null) {
                    cultivoSeleccionado = cultivoRepository.findById(cultivoId).orElse(null);
                    model.addAttribute("cultivoSeleccionado", cultivoSeleccionado);
                }
            }
        } else if (cultivoId != null) {
            cultivoSeleccionado = cultivoRepository.findById(cultivoId).orElse(null);
            model.addAttribute("cultivoSeleccionado", cultivoSeleccionado);
        }

        if (pregunta != null && !pregunta.trim().isEmpty() && cultivoSeleccionado != null) {
            String contextoCultivo = "Considerando mi cultivo de " + cultivoSeleccionado.getNombre();
            if (cultivoSeleccionado.getFechaSiembra() != null) {
                contextoCultivo += " sembrado el " + cultivoSeleccionado.getFechaSiembra();
            }
            if (cultivoSeleccionado.getDescripcion() != null && !cultivoSeleccionado.getDescripcion().isEmpty()) {
                contextoCultivo += ", con la siguiente descripción: " + cultivoSeleccionado.getDescripcion();
            }
            if (cultivoSeleccionado.getTipoTerreno() != null) {
                contextoCultivo += ", en un terreno de tipo: " + cultivoSeleccionado.getTipoTerreno().getNombre();
            }
            if (userContext != null && !userContext.trim().isEmpty()) {
                contextoCultivo += ". Además, tengo este conocimiento adicional: " + userContext;
            }
            pregunta = contextoCultivo + ". " + pregunta;
            String recomendacion = geminiService.getAgriculturalRecommendation(pregunta);
            model.addAttribute("recomendacion", recomendacion);
            model.addAttribute("pregunta", pregunta);
            model.addAttribute("busquedaRealizada", true);
        } else if (pregunta != null && !pregunta.trim().isEmpty()) {
            String recomendacion = geminiService.getAgriculturalRecommendation(pregunta);
            model.addAttribute("recomendacion", recomendacion);
            model.addAttribute("pregunta", pregunta);
            model.addAttribute("busquedaRealizada", true);
        }

        return "recomendacion";
    }

    @GetMapping("/seguimiento_cultivo")
    public String obtenerSeguimientoCultivo(@RequestParam("cultivoId") Long cultivoId, Model model, @AuthenticationPrincipal OAuth2User principal) {
        Cultivo cultivoSeleccionado = cultivoRepository.findById(cultivoId).orElse(null);
        if (cultivoSeleccionado != null) {
            String nombreCultivo = cultivoSeleccionado.getNombre();
            LocalDate fechaSiembra = cultivoSeleccionado.getFechaSiembra();
            String descripcionCultivo = cultivoSeleccionado.getDescripcion();
            TipoTerreno tipoTerrenoCultivo = cultivoSeleccionado.getTipoTerreno();

            model.addAttribute("cultivoNombre", nombreCultivo);
            model.addAttribute("fechaSiembra", fechaSiembra);

            String contextoBase = "Recomendaciones cortas para ";
            String contextoCultivo = " considerando mi cultivo de " + nombreCultivo;
            if (fechaSiembra != null) {
                contextoCultivo += " sembrado el " + fechaSiembra;
            }
            if (descripcionCultivo != null && !descripcionCultivo.isEmpty()) {
                contextoCultivo += ", con la descripción: " + descripcionCultivo;
            }
            if (tipoTerrenoCultivo != null) {
                contextoCultivo += ", en un terreno de tipo: " + tipoTerrenoCultivo.getNombre();
            }

            Map<String, String> etapasInfo = new LinkedHashMap<>();
            String preguntaSiembra = contextoBase + "la siembra" + contextoCultivo + ".";
            String preguntaAbonado = contextoBase + "el abonado durante el desarrollo" + contextoCultivo + ".";
            String preguntaLimpieza = contextoBase + "la limpieza de malezas durante el desarrollo" + contextoCultivo + ".";
            String preguntaCosecha = contextoBase + "la cosecha" + contextoCultivo + ".";

            etapasInfo.put("Siembra", geminiService.getAgriculturalRecommendation(preguntaSiembra));
            etapasInfo.put("Abonado (Desarrollo)", geminiService.getAgriculturalRecommendation(preguntaAbonado));
            etapasInfo.put("Limpieza (Desarrollo)", geminiService.getAgriculturalRecommendation(preguntaLimpieza));
            etapasInfo.put("Cosecha", geminiService.getAgriculturalRecommendation(preguntaCosecha));

            model.addAttribute("etapas", etapasInfo);
            return "seguimiento_cultivo";
        } else {
            model.addAttribute("error", "No se encontró el cultivo para el seguimiento.");
            return "recomendacion";
        }
    }

    @GetMapping("/registrar_cultivo")
    public String mostrarFormularioRegistroCultivo(Model model) {
        List<TipoTerreno> tiposTerreno = tipoTerrenoRepository.findAll();
        model.addAttribute("tiposTerreno", tiposTerreno);
        model.addAttribute("cultivo", new Cultivo()); // Para el binding del formulario
        return "registrar_cultivo";
    }

    @PostMapping("/guardar_cultivo")
    public String guardarCultivo(@RequestParam String nombre,
                                 @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaSiembra,
                                 @RequestParam String descripcion,
                                 @RequestParam Long tipoTerrenoId, // Recibimos el ID del TipoTerreno
                                 @AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            String googleId = (String) principal.getAttributes().get("sub");
            Usuario usuario = usuarioRepository.findByGoogleId(googleId);
            TipoTerreno tipoTerreno = tipoTerrenoRepository.findById(tipoTerrenoId).orElse(null);
            if (usuario != null && tipoTerreno != null) {
                Cultivo cultivo = new Cultivo(nombre, fechaSiembra, descripcion, tipoTerreno, usuario);
                cultivoRepository.save(cultivo);
                System.out.println("Cultivo guardado: " + cultivo.getNombre() + " para el usuario: " + usuario.getNombre() +
                        ", descripción: " + cultivo.getDescripcion() + ", tipo de terreno: " + cultivo.getTipoTerreno().getNombre());
                return "redirect:/recomendar"; // Redirigir a la sección de recomendaciones después de guardar
            } else {
                return "redirect:/registrar_cultivo?error=datos_invalidos";
            }
        }
        return "redirect:/registrar_cultivo?error=usuario_no_encontrado"; // Redirigir con error si no se encuentra el usuario
    }
}