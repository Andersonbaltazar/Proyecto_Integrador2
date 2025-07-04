package tecsup.edu.pe.integrador_2.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private MobileOAuth2TokenFilter mobileOAuth2TokenFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors() // ✅ Habilita CORS para que use lo definido en WebConfig
                .and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/logout-success", "/api/mobile/auth").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(mobileOAuth2TokenFilter, UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:5173/callback", true)
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // <-- asegúrate que sea POST
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        })
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                )
                .csrf(csrf -> csrf.disable()); // Opcional: desactiva CSRF si solo haces SPA + API
        return http.build();
    }
}
