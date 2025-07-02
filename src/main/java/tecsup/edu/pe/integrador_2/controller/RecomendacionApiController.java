package tecsup.edu.pe.integrador_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
        import tecsup.edu.pe.integrador_2.model.Cultivo;
import tecsup.edu.pe.integrador_2.model.Recomendacion;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.CultivoRepository;
import tecsup.edu.pe.integrador_2.repository.RecomendacionRepository;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;
import tecsup.edu.pe.integrador_2.service.GeminiService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recomendaciones")
public class RecomendacionApiController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CultivoRepository cultivoRepository;
    @Autowired
    private RecomendacionRepository recomendacionRepository;
    @Autowired
    private GeminiService geminiService;

    @PostMapping("/cultivo/{cultivoId}")
    public ResponseEntity<?> generarYGuardarRecomendacion(
            @PathVariable Long cultivoId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(401).body("Debe autenticarse.");
        }

        String pregunta = body.get("pregunta");
        if (pregunta == null || pregunta.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("La pregunta es obligatoria");
        }

        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) return ResponseEntity.status(404).body("Usuario no encontrado");

        Cultivo cultivo = cultivoRepository.findById(cultivoId).orElse(null);
        if (cultivo == null || !cultivo.getUsuario().getId().equals(usuario.getId()))
            return ResponseEntity.status(403).body("No tienes acceso a este cultivo");

        StringBuilder contexto = new StringBuilder("Considerando mi cultivo de " + cultivo.getCultivo());
        if (cultivo.getFechaSiembra() != null)
            contexto.append(" sembrado el ").append(cultivo.getFechaSiembra());
        if (cultivo.getDescripcion() != null && !cultivo.getDescripcion().isEmpty())
            contexto.append(", con la siguiente descripción: ").append(cultivo.getDescripcion());
        if (cultivo.getTipoTerreno() != null)
            contexto.append(", en un terreno de tipo: ").append(cultivo.getTipoTerreno().getNombre());
        if (cultivo.getLocalidad() != null)
            contexto.append(", ubicado geográficamente en: ").append(cultivo.getLocalidad());

        String preguntaIA = contexto.toString() + ". " + pregunta;

        String respuesta = geminiService.getAgriculturalRecommendation(preguntaIA);

        Recomendacion rec = new Recomendacion();
        rec.setPregunta(pregunta);
        rec.setRespuesta(respuesta);
        rec.setCultivo(cultivo);

        recomendacionRepository.save(rec);

        return ResponseEntity.ok(rec);
    }

    @GetMapping("/cultivo/{cultivoId}")
    public ResponseEntity<?> listarPorCultivo(
            @PathVariable Long cultivoId,
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) return ResponseEntity.status(401).body("Debe autenticarse.");

        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) return ResponseEntity.status(404).body("Usuario no encontrado");

        Cultivo cultivo = cultivoRepository.findById(cultivoId).orElse(null);
        if (cultivo == null || !cultivo.getUsuario().getId().equals(usuario.getId()))
            return ResponseEntity.status(403).body("No tienes acceso a este cultivo");

        List<Recomendacion> recomendaciones = recomendacionRepository.findByCultivoId(cultivo.getId());
        return ResponseEntity.ok(recomendaciones);
    }
}