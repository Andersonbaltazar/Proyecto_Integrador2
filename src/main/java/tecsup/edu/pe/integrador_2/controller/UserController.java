package tecsup.edu.pe.integrador_2.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/api/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Map.of("authenticated", false);
        }

        return Map.of(
                "authenticated", true,
                "name", principal.getAttribute("name"),
                "first_name", principal.getAttribute("given_name"),
                "last_name", principal.getAttribute("family_name"),
                "email", principal.getAttribute("email"),
                "picture", principal.getAttribute("picture")
        );
    }


}