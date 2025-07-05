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

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SeguimientoCultivoApiController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CultivoRepository cultivoRepository;
    @Autowired
    private GeminiService geminiService;

    @GetMapping("/seguimiento_cultivo")
    public ResponseEntity<?> obtenerSeguimientoCultivo(
            @RequestParam("cultivoId") Long cultivoId,
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Debe autenticarse."));
        }

        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Usuario no encontrado"));
        }

        Cultivo cultivo = cultivoRepository.findById(cultivoId).orElse(null);
        if (cultivo == null) {
            return ResponseEntity.status(404).body(Map.of("error", "No se encontró el cultivo."));
        }
        if (!cultivo.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "No tienes acceso a este cultivo"));
        }

        // Calcular edad
        LocalDate hoy = LocalDate.now();
        LocalDate fechaSiembra = cultivo.getFechaSiembra();
        long dias = ChronoUnit.DAYS.between(fechaSiembra, hoy);
        long meses = ChronoUnit.MONTHS.between(fechaSiembra, hoy);
        String edadCultivo = meses > 0 ? meses + " meses" : dias + " días";

        // Construir contexto para IA
        StringBuilder contextoCultivo = new StringBuilder("Cultivo de " + cultivo.getNombre());
        if (fechaSiembra != null) contextoCultivo.append(", sembrado el ").append(fechaSiembra);
        if (cultivo.getDescripcion() != null && !cultivo.getDescripcion().isEmpty())
            contextoCultivo.append(", descripción: ").append(cultivo.getDescripcion());
        if (cultivo.getTipoTerreno() != null)
            contextoCultivo.append(", terreno: ").append(cultivo.getTipoTerreno().getNombre());
        contextoCultivo.append(". Edad del cultivo: ").append(edadCultivo).append(" (").append(dias).append(" días).");

        // Preguntar a la IA la etapa actual
        String preguntaEtapa = "Considerando el " + contextoCultivo +
                " ¿En qué etapa de desarrollo se encuentra? Responde solo el nombre de la etapa: Siembra, Abonado, Limpieza o Cosecha.";
        String etapaActual = geminiService.getAgriculturalRecommendation(preguntaEtapa).trim();

        // Generar recomendaciones por etapa
        Map<String, String> etapasInfo = new LinkedHashMap<>();
        String recomendacionActual = "";
        String[] etapas = {"Siembra", "Abonado", "Limpieza", "Cosecha"};
        for (String etapa : etapas) {
            String pregunta;
            if (etapa.equalsIgnoreCase(etapaActual)) {
                // Detallada para la etapa actual
                if (etapa.equalsIgnoreCase("Abonado")) {
                    pregunta = "Dame la mejor recomendación posible y detallada para la etapa de Abonado para el siguiente contexto: " +
                            contextoCultivo + ". Incluye el tipo de abono recomendado, cantidades por planta y cómo aplicarlo.";
                } else {
                    pregunta = "Dame la mejor recomendación posible y detallada para la etapa de " + etapa +
                            " para el siguiente contexto: " + contextoCultivo + ".";
                }
            } else {
                // Cortas para las demás etapas
                if (etapa.equalsIgnoreCase("Abonado")) {
                    pregunta = "Dame una recomendación corta para la etapa de Abonado para el siguiente contexto: " +
                            contextoCultivo + ". Incluye tipo de abono y cantidades por planta.";
                } else {
                    pregunta = "Dame una recomendación corta para la etapa de " + etapa +
                            " para el siguiente contexto: " + contextoCultivo + ".";
                }
            }
            String respuesta = geminiService.getAgriculturalRecommendation(pregunta);
            etapasInfo.put(etapa, respuesta);

            if (etapa.equalsIgnoreCase(etapaActual)) {
                recomendacionActual = respuesta;
            }
        }

        // Construir respuesta JSON
        Map<String, Object> resp = new HashMap<>();
        resp.put("edad", edadCultivo);
        resp.put("etapaActual", etapaActual);
        resp.put("recomendacionActual", recomendacionActual);
        resp.put("recomendaciones", etapasInfo);

        return ResponseEntity.ok(resp);
    }
}