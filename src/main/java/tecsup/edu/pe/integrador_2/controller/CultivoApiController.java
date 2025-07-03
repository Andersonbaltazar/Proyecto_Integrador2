package tecsup.edu.pe.integrador_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import tecsup.edu.pe.integrador_2.model.Cultivo;
import tecsup.edu.pe.integrador_2.model.Estado;
import tecsup.edu.pe.integrador_2.model.TipoTerreno;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.CultivoRepository;
import tecsup.edu.pe.integrador_2.repository.TipoTerrenoRepository;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cultivos")
public class CultivoApiController {

    @Autowired
    private CultivoRepository cultivoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private TipoTerrenoRepository tipoTerrenoRepository;

    @GetMapping
    public ResponseEntity<?> obtenerCultivosUsuario(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("No autorizado: sesión requerida.");
        }

        String email = (String) principal.getAttribute("email");

        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        List<Cultivo> cultivos = cultivoRepository.findByUsuario(usuario);
        return ResponseEntity.ok(cultivos);
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarCultivo(
            @RequestBody Map<String, Object> payload,
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(401).body("No autorizado: sesión requerida.");
        }

        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        try {
            String nombre = (String) payload.get("nombre");
            String cultivo = (String) payload.get("cultivo");
            String descripcion = (String) payload.get("descripcion");
            String localidad = (String) payload.get("localidad");

            Long tipoTerrenoId = Long.parseLong(payload.get("tipoTerrenoId").toString());
            TipoTerreno tipoTerreno = tipoTerrenoRepository.findById(tipoTerrenoId).orElse(null);

            if (tipoTerreno == null) {
                return ResponseEntity.status(400).body("Tipo de terreno inválido");
            }

            LocalDate fechaSiembra = null;
            if (payload.get("fechaSiembra") != null) {
                fechaSiembra = LocalDate.parse(payload.get("fechaSiembra").toString());
            }

            Cultivo nuevoCultivo = new Cultivo(nombre, cultivo, fechaSiembra, descripcion, localidad, usuario, tipoTerreno);
            cultivoRepository.save(nuevoCultivo);

            return ResponseEntity.ok(nuevoCultivo);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al procesar los datos: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCultivo(
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload,
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(401).body("No autorizado: sesión requerida.");
        }

        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        Optional<Cultivo> cultivoOpt = cultivoRepository.findById(id);
        if (cultivoOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Cultivo no encontrado");
        }

        Cultivo cultivo = cultivoOpt.get();

        // Asegurarse que el cultivo pertenece al usuario
        if (!cultivo.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(403).body("No tienes permiso para editar este cultivo");
        }

        try {
            if (payload.containsKey("nombre"))
                cultivo.setNombre((String) payload.get("nombre"));

            if (payload.containsKey("cultivo"))
                cultivo.setCultivo((String) payload.get("cultivo"));

            if (payload.containsKey("descripcion"))
                cultivo.setDescripcion((String) payload.get("descripcion"));

            if (payload.containsKey("localidad"))
                cultivo.setLocalidad((String) payload.get("localidad"));

            if (payload.containsKey("fechaSiembra"))
                cultivo.setFechaSiembra(LocalDate.parse(payload.get("fechaSiembra").toString()));

            if (payload.containsKey("tipoTerrenoId")) {
                Long tipoTerrenoId = Long.parseLong(payload.get("tipoTerrenoId").toString());
                TipoTerreno tipoTerreno = tipoTerrenoRepository.findById(tipoTerrenoId).orElse(null);
                if (tipoTerreno == null) {
                    return ResponseEntity.status(400).body("Tipo de terreno inválido");
                }
                cultivo.setTipoTerreno(tipoTerreno);
            }

            if (payload.containsKey("estado")) {
                try {
                    String estadoStr = payload.get("estado").toString();
                    Estado estado = Estado.valueOf(estadoStr);
                    cultivo.setEstado(estado);
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.status(400).body("Estado inválido. Valores válidos: ACTIVO, INACTIVO, PENDIENTE");
                }
            }

            cultivoRepository.save(cultivo);
            return ResponseEntity.ok(cultivo);

        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al actualizar el cultivo: " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCultivo(
            @PathVariable Long id,
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(401).body("No autorizado: sesión requerida.");
        }

        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        Optional<Cultivo> cultivoOpt = cultivoRepository.findById(id);
        if (cultivoOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Cultivo no encontrado");
        }

        Cultivo cultivo = cultivoOpt.get();

        // Asegurarse que el cultivo pertenece al usuario
        if (!cultivo.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(403).body("No tienes permiso para eliminar este cultivo");
        }

        cultivoRepository.delete(cultivo);
        return ResponseEntity.ok("Cultivo eliminado correctamente");
    }

    @PatchMapping("/cultivo/{cultivoId}/estado")
    public ResponseEntity<?> actualizarEstadoCultivo(
            @PathVariable Long cultivoId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) return ResponseEntity.status(401).body("Debe autenticarse.");

        String googleId = (String) principal.getAttributes().get("sub");
        Usuario usuario = usuarioRepository.findByGoogleId(googleId);
        if (usuario == null) return ResponseEntity.status(404).body("Usuario no encontrado");

        Cultivo cultivo = cultivoRepository.findById(cultivoId).orElse(null);
        if (cultivo == null || !cultivo.getUsuario().getId().equals(usuario.getId()))
            return ResponseEntity.status(403).body("No tienes acceso a este cultivo");

        String nuevoEstado = body.get("estado");
        if (nuevoEstado == null || (!nuevoEstado.equalsIgnoreCase("Activo") && !nuevoEstado.equalsIgnoreCase("Completado"))) {
            return ResponseEntity.badRequest().body("Estado inválido. Debe ser 'Activo' o 'Completado'");
        }

        cultivo.setEstado(Estado.valueOf(nuevoEstado));
        cultivoRepository.save(cultivo);

        return ResponseEntity.ok("Estado del cultivo actualizado a: " + nuevoEstado);
    }

}