package tecsup.edu.pe.integrador_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
        import tecsup.edu.pe.integrador_2.model.Cultivo;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.CultivoRepository;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;
import tecsup.edu.pe.integrador_2.service.GeminiService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/recomendaciones")
public class RecomendacionApiController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CultivoRepository cultivoRepository;
    @Autowired
    private GeminiService geminiService;

    @GetMapping("/cultivos/{cultivoId}/recomendar")
    public ResponseEntity<?> recomendarPorCultivo(
            @PathVariable Long cultivoId,
            @RequestParam(name = "pregunta") String pregunta,
            @RequestParam(name = "userContext", required = false) String userContext,
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(401).body("Debe autenticarse.");
        }

        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        Cultivo cultivo = cultivoRepository.findById(cultivoId).orElse(null);
        if (cultivo == null) {
            return ResponseEntity.status(404).body("Cultivo no encontrado");
        }
        if (!cultivo.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(403).body("No tienes acceso a este cultivo");
        }

        StringBuilder contexto = new StringBuilder("Considerando mi cultivo de " + cultivo.getCultivo());
        if (cultivo.getFechaSiembra() != null)
            contexto.append(" sembrado el ").append(cultivo.getFechaSiembra());
        if (cultivo.getDescripcion() != null && !cultivo.getDescripcion().isEmpty())
            contexto.append(", con la siguiente descripción: ").append(cultivo.getDescripcion());
        if (cultivo.getTipoTerreno() != null)
            contexto.append(", en un terreno de tipo: ").append(cultivo.getTipoTerreno().getNombre());
        if (userContext != null && !userContext.trim().isEmpty())
            contexto.append(". Además, tengo esta experiencia/conocimiento: ").append(userContext);
        String preguntaParaIA = contexto.toString() + ". " + pregunta;

        String recomendacion = geminiService.getAgriculturalRecommendation(preguntaParaIA);

        Map<String, Object> resp = new HashMap<>();
        resp.put("pregunta", pregunta);
        resp.put("recomendacion", recomendacion);
        resp.put("cultivoId", cultivoId);

        return ResponseEntity.ok(resp);
    }
}