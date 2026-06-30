package com.codewalnut.exercises.quotes;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record QuoteItem(
    @NotBlank String sku,
    @Min(1) int quantity,
    @Min(0) double unitPrice,
    @NotNull Category category
) {
    public enum Category {
        software,
        services,
        hardware
    }
}

