package tecsup.edu.pe.integrador_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import org.springframework.beans.factory.annotation.Value;
import tecsup.edu.pe.integrador_2.model.Usuario;
import tecsup.edu.pe.integrador_2.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;
import java.util.HashMap;

//Controlador para autenticación de dispositivos móviles
//Procesa tokens de autenticación de Google para apps móviles
 
@RestController
@RequestMapping("/api/mobile")
public class MobileAuthController {

    @Value("${security.oauth2.mobile.client-id}")
    private String googleClientId;

    @Autowired
    private UsuarioRepository usuarioRepository;

    //Endpoint único para autenticación móvil.
    //Recibe el token de Google, lo verifica y guarda/actualiza el usuario
    
    @PostMapping("/auth")
    public Map<String, Object> authenticate(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.put("success", false);
                response.put("message", "Token no proporcionado");
                return response;
            }

            String idTokenString = authHeader.substring(7); 
            
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Obtener información del usuario del token
                String userId = payload.getSubject();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                Boolean emailVerified = (Boolean) payload.get("email_verified");
                String pictureUrl = (String) payload.get("picture");
                String givenName = (String) payload.get("given_name");
                String familyName = (String) payload.get("family_name");
                String hd = (String) payload.get("hd");

                // Guardar o actualizar usuario en la base de datos
                Usuario usuario = usuarioRepository.findByGoogleId(userId);
                if (usuario == null) {
                    usuario = new Usuario();
                    usuario.setGoogleId(userId);
                    usuario.setEmail(email);
                    usuario.setNombre(name);
                    usuario.setEmailVerificado(emailVerified);
                    usuario.setFotoPerfilUrl(pictureUrl);
                    usuario.setNombrePila(givenName);
                    usuario.setApellido(familyName);
                    usuario.setDominioHd(hd);
                    usuario.setUltimoLogin(LocalDateTime.now());
                    usuarioRepository.save(usuario);
                    response.put("msg", "Usuario guardado");
                } else {
                    usuario.setUltimoLogin(LocalDateTime.now());
                    usuarioRepository.save(usuario);
                    response.put("msg", "Usuario existente, último login actualizado");
                }

                // Respuesta exitosa con datos del usuario
                response.put("success", true);
                response.put("authenticated", true);
                response.put("userId", userId);
                response.put("email", email);
                response.put("name", name);
                response.put("picture", pictureUrl);
            } else {
                response.put("success", false);
                response.put("message", "Token inválido");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al verificar token: " + e.getMessage());
        }

        return response;
    }
}
