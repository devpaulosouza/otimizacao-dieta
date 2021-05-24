package dev.paulosouza.otimizacaodieta.controller;

import dev.paulosouza.otimizacaodieta.dto.DietaRequest;
import dev.paulosouza.otimizacaodieta.dto.DietaResponse;
import dev.paulosouza.otimizacaodieta.service.DietaService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;

@RestController
@RequestMapping("dieta")
public class DietaController {

    private final DietaService dietaService;

    public DietaController(DietaService dietaService) {
        this.dietaService = dietaService;
    }

    @PostMapping
    public ResponseEntity<DietaResponse> calcular(@RequestBody DietaRequest dietaRequest) {
        DietaResponse dietaResponse = dietaService.calculate(dietaRequest);

        return ResponseEntity.ok(dietaResponse);

    }

}
