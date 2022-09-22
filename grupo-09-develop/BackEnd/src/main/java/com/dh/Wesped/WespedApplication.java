package com.dh.Wesped;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Wesped API", version = "1.0", description = "Proyecto Integrador - " +
        "Equipo 9 - Certified Tech Developer - Digital House [2022]"))
public class WespedApplication {

    public static void main(String[] args) {
        SpringApplication.run(WespedApplication.class, args);
    }

}