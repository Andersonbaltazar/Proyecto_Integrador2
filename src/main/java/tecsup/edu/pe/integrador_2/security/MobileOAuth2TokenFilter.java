package tecsup.edu.pe.integrador_2.security;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class MobileOAuth2TokenFilter implements Filter {

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
      @Value("${security.oauth2.mobile.client-id:}")
    private String googleClientId;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
          HttpServletRequest httpRequest = (HttpServletRequest) request;
        
        // Solo procesar peticiones de móviles
        String userAgent = httpRequest.getHeader("User-Agent");
        String authorizationHeader = httpRequest.getHeader("Authorization");
        String requestPath = httpRequest.getRequestURI();
        
        // Si es una petición de móvil y tiene token de autorización
        if (isMobileRequest(userAgent, requestPath) && authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Remover "Bearer "
            
            try {
                // Verificar el token de Google
                if (verifyGoogleToken(token)) {
                    // Crear autenticación para el contexto de seguridad
                    UsernamePasswordAuthenticationToken authentication = 
                        new UsernamePasswordAuthenticationToken(
                            "mobile-user", 
                            null, 
                            List.of(new SimpleGrantedAuthority("ROLE_USER"))
                        );
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                // Log del error (opcional)
                System.err.println("Error verificando token móvil: " + e.getMessage());
                // Continuar sin autenticar
            }
        }
        
        chain.doFilter(request, response);
    }
    
    private boolean isMobileRequest(String userAgent, String requestPath) {
        // Detectar si es una petición móvil
        return (userAgent != null && (userAgent.contains("Mobile") || userAgent.contains("Android") || userAgent.contains("iPhone")))
            || (requestPath != null && requestPath.startsWith("/api/mobile/"));
    }
    
    private boolean verifyGoogleToken(String idTokenString) {
        try {
            if (googleClientId == null || googleClientId.isEmpty()) {
                return false; // No hay client ID configurado
            }
            
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(), JSON_FACTORY)
                .setAudience(Collections.singletonList(googleClientId))
                .build();            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                
                // Opcionalmente puedes extraer información del usuario
                String email = payload.getEmail();
                
                // Log de información (opcional)
                System.out.println("Usuario móvil autenticado: " + email);
                
                return true;
            }
        } catch (Exception e) {
            System.err.println("Error verificando token de Google: " + e.getMessage());
        }
        return false;
    }
}