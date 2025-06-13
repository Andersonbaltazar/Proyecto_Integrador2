package tecsup.edu.pe.integrador_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import tecsup.edu.pe.integrador_2.model.Cultivo;
import tecsup.edu.pe.integrador_2.model.TipoTerreno;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.CultivoRepository;
import tecsup.edu.pe.integrador_2.repository.TipoTerrenoRepository;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cultivos")
public class CultivoApiController {

    @Autowired
    private CultivoRepository cultivoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private TipoTerrenoRepository tipoTerrenoRepository;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarCultivo(
            @RequestBody Map<String, Object> payload,
            @AuthenticationPrincipal OAuth2User principal) {

        // Solo permite guardar cultivos si el usuario está autenticado
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
            String descripcion = (String) payload.get("descripcion");
            Long tipoTerrenoId = Long.parseLong(payload.get("tipoTerrenoId").toString());
            TipoTerreno tipoTerreno = tipoTerrenoRepository.findById(tipoTerrenoId).orElse(null);
            LocalDate fechaSiembra = null;
            if (payload.get("fechaSiembra") != null) {
                fechaSiembra = LocalDate.parse(payload.get("fechaSiembra").toString());
            }
            if (tipoTerreno == null) {
                return ResponseEntity.status(400).body("Tipo de terreno inválido");
            }

            Cultivo cultivo = new Cultivo(nombre, fechaSiembra, descripcion, tipoTerreno, usuario);
            cultivoRepository.save(cultivo);

            Map<String, Object> resp = new HashMap<>();
            resp.put("message", "Cultivo guardado exitosamente");
            resp.put("cultivoId", cultivo.getId());
            return ResponseEntity.ok(resp);

        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al procesar los datos: " + e.getMessage());
        }
    }
}