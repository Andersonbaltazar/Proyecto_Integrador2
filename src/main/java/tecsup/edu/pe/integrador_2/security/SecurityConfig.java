package tecsup.edu.pe.integrador_2.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/logout-success").permitAll()
                        .requestMatchers(HttpMethod.POST, "/logout").permitAll()  // <-- agregar esta línea
                        .anyRequest().authenticated()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")  // POST /logout para cerrar sesión
                        .logoutSuccessUrl("http://localhost:5173/login")  // redirige al login SPA (aunque en SPA esto no es necesario)
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:5173/dashboard", true)
                );

        return http.build();
    }
}