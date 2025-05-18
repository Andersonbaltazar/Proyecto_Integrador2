package tecsup.edu.pe.integrador_2.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    private final RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    private final String geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    public GeminiService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public String getAgriculturalRecommendation(String query) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> prompt = new HashMap<>();
        prompt.put("text", query);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(prompt));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        String urlWithApiKey = geminiApiUrl + "?key=" + apiKey;

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(urlWithApiKey, request, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                System.out.println("Respuesta completa de Gemini: " + response.getBody());
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> contentResponse = (Map<String, Object>) candidate.get("content");
                    if (contentResponse != null) {
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) contentResponse.get("parts");
                        if (parts != null && !parts.isEmpty()) {
                            Map<String, Object> part = parts.get(0);
                            return (String) part.get("text");
                        }
                    }
                }
                return "No se pudo extraer la recomendación.";
            } else {
                System.err.println("Error al llamar a la API de Gemini: " + response.getStatusCode());
                return "Error al obtener la recomendación.";
            }
        } catch (Exception e) {
            System.err.println("Excepción al llamar a la API de Gemini: " + e.getMessage());
            return "Error al obtener la recomendación.";
        }
    }
}