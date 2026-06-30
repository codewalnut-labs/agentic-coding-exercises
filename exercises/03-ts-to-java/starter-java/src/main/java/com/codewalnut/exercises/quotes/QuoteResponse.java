package com.codewalnut.exercises.quotes;

public record QuoteResponse(
    double subtotal,
    double tierDiscount,
    double promoDiscount,
    double tax,
    double total
) {}

