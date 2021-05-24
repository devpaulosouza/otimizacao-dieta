package dev.paulosouza.otimizacaodieta.dto;

import lombok.Data;

@Data
public class DietaRequest {

    String [] alimentos;

    double [] custos;

    double [] minimosAlimento;

    double [] maximosAlimento;

    String [] nutrientes;

    double [] minimosNutriente;

    double [] maximosNutriente;

    double [] [] quantidades;


}
