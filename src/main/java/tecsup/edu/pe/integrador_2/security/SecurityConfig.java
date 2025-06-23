package tecsup.edu.pe.integrador_2.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf(csrf -> csrf.disable()) // Desactiva CSRF solo si usas cookies sin token
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/logout-success").permitAll()
                        .requestMatchers(HttpMethod.POST, "/logout").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 ->
                        oauth2
                                .defaultSuccessUrl("http://localhost:5173/callback", true) // 👈 Redirige al frontend después de login
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // <-- ruta para cerrar sesión
                        .logoutSuccessHandler((request, response, auth) -> {
                            response.setStatus(200); // <-- evita redirecciones y permite control desde el frontend
                        })
                );

        return http.build();
    }
}
