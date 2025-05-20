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
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/logout-success").permitAll()
                        .requestMatchers(HttpMethod.POST, "/logout").permitAll()  // <-- agregar esta línea
                        .anyRequest().authenticated()
                )
                .oauth2Login(withDefaults())
                .logout(logout -> logout
                        .logoutSuccessUrl("/")
                )
                .csrf(withDefaults()); // Añade esta línea para habilitar CSRF
        return http.build();
    }
}