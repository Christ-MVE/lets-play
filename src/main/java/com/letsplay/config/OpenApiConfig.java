package com.letsplay.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("lets-play API")
                        .version("v0")
                        .description("REST API · Spring Boot 3 · MongoDB · JWT")
                        .contact(new Contact()
                                .name("lets-play")
                                .email("contact@letsplay.com")))

                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Serveur local")))

                .addSecurityItem(new SecurityRequirement().addList("Bearer Auth"))

                .components(new Components()
                        .addSecuritySchemes("Bearer Auth", new SecurityScheme()
                                .name("Bearer Auth")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Entrez votre token JWT (sans le préfixe 'Bearer')")));
    }
}