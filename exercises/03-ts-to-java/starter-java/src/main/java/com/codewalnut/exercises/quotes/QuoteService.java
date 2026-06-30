package com.codewalnut.exercises.quotes;

import org.springframework.stereotype.Service;

@Service
public class QuoteService {
    public QuoteResponse buildQuote(QuoteRequest request) {
        double subtotal = request.items().stream()
            .mapToDouble(item -> item.quantity() * item.unitPrice())
            .sum();

        return new QuoteResponse(
            roundMoney(subtotal),
            0,
            0,
            0,
            roundMoney(subtotal)
        );
    }

    private double roundMoney(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}

