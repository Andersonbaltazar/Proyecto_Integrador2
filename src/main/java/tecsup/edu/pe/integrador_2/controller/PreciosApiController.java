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
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/precios")
public class PreciosApiController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CultivoRepository cultivoRepository;

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/cultivo/{cultivoId}")
    public ResponseEntity<?> obtenerPreciosCultivo(
            @PathVariable Long cultivoId,
            @AuthenticationPrincipal OAuth2User principal) {

        // Verificar autenticación
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Debe autenticarse."));
        }

        // Obtener usuario desde OAuth2
        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Usuario no encontrado"));
        }

        // Verificar que el cultivo existe
        Cultivo cultivo = cultivoRepository.findById(cultivoId).orElse(null);
        if (cultivo == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Cultivo no encontrado"));
        }

        // Verificar que el cultivo pertenece al usuario autenticado
        if (!cultivo.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "No tienes acceso a este cultivo"));
        }

        try {
            // Estimar fecha de cosecha usando IA
            LocalDate fechaCosecha = estimarFechaCosecha(cultivo);

            // Construir contexto para la IA
            String contexto = String.format(
                    "Cultivo de %s sembrado el %s, con fecha de cosecha estimada el %s. Tipo de terreno: %s. %s",
                    cultivo.getCultivo(),
                    cultivo.getFechaSiembra(),
                    fechaCosecha,
                    cultivo.getTipoTerreno() != null ? cultivo.getTipoTerreno().getNombre() : "no especificado",
                    cultivo.getDescripcion() != null ? "Descripción: " + cultivo.getDescripcion() : ""
            );

            // Consultar precio actual en dólares a la IA
            String preguntaPrecioActual = String.format(
                    "Para el siguiente %s, dame SOLO EL NÚMERO del precio actual aproximado por kilogramo en dólares estadounidenses (USD). " +
                            "Responde ÚNICAMENTE con el número decimal, ejemplo: 1.25",
                    contexto
            );

            // Consultar precio futuro basado en fecha de cosecha
            String preguntaPrecioFuturo = String.format(
                    "Para el siguiente %s, considerando que será cosechado el %s, " +
                            "dame SOLO EL NÚMERO del precio estimado por kilogramo en dólares estadounidenses (USD) en la fecha de cosecha. " +
                            "Responde ÚNICAMENTE con el número decimal, ejemplo: 1.50",
                    contexto, fechaCosecha
            );

            // Obtener respuestas de la IA
            String respuestaPrecioActual = geminiService.getAgriculturalRecommendation(preguntaPrecioActual);
            String respuestaPrecioFuturo = geminiService.getAgriculturalRecommendation(preguntaPrecioFuturo);

            // Extraer precios
            double precioActual = extraerPrecio(respuestaPrecioActual, 0.80);
            double precioFuturo = extraerPrecio(respuestaPrecioFuturo, precioActual * 1.2);

            // JSON simple
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("id", cultivoId);
            respuesta.put("nombre", cultivo.getNombre());
            respuesta.put("fechaCosecha", fechaCosecha);
            respuesta.put("precioActualPorKilo", Math.round(precioActual * 100.0) / 100.0);
            respuesta.put("precioFuturoPorKilo", Math.round(precioFuturo * 100.0) / 100.0);

            return ResponseEntity.ok(respuesta);

        } catch (Exception e) {
            Map<String, Object> errorResp = new HashMap<>();
            errorResp.put("error", "Error al procesar solicitud de precios");
            errorResp.put("detalle", e.getMessage());
            return ResponseEntity.status(500).body(errorResp);
        }
    }

    /**
     * Estima la fecha de cosecha usando solo IA
     */
    private LocalDate estimarFechaCosecha(Cultivo cultivo) {
        try {
            String pregunta = String.format(
                    "Para un cultivo de %s sembrado el %s en terreno %s, " +
                            "¿cuándo sería la fecha aproximada de cosecha? Responde SOLO con la fecha en formato YYYY-MM-DD",
                    cultivo.getNombre(),
                    cultivo.getFechaSiembra(),
                    cultivo.getTipoTerreno() != null ? cultivo.getTipoTerreno().getNombre() : "normal"
            );

            String respuesta = geminiService.getAgriculturalRecommendation(pregunta);

            // Intentar extraer fecha de la respuesta
            Pattern patron = Pattern.compile("(\\d{4}-\\d{2}-\\d{2})");
            Matcher matcher = patron.matcher(respuesta);

            if (matcher.find()) {
                return LocalDate.parse(matcher.group(1));
            }
        } catch (Exception e) {
            System.err.println("Error al estimar fecha de cosecha: " + e.getMessage());
        }

        // Fallback simple: 90 días después de siembra
        return cultivo.getFechaSiembra().plusDays(90);
    }


     //Extrae precio de la respuesta de IA
    private double extraerPrecio(String respuestaIA, double valorPorDefecto) {
        try {
            String respuestaLimpia = respuestaIA.trim().replaceAll("[^0-9.,]", "");
            Pattern patron = Pattern.compile("(\\d+[.,]?\\d*)");
            Matcher matcher = patron.matcher(respuestaLimpia);

            if (matcher.find()) {
                String numeroStr = matcher.group(1).replace(",", ".");
                double precio = Double.parseDouble(numeroStr);
                return precio > 0 ? precio : valorPorDefecto;
            }
        } catch (Exception e) {
            System.err.println("Error al extraer precio: " + e.getMessage());
        }

        return valorPorDefecto;
    }
}