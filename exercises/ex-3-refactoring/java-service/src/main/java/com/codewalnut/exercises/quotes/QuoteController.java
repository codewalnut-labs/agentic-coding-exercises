package com.codewalnut.exercises.quotes;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class QuoteController {
    @GetMapping("/health")
    Map<String, String> health() {
        return Map.of("status", "ok");
    }

    @PostMapping("/quotes")
    ResponseEntity<Map<String, Object>> createQuote(@RequestBody QuoteRequest request) {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(Map.of(
            "error", "Implement the TypeScript prototype behavior in Java",
            "receivedItems", request.items() == null ? 0 : request.items().size()
        ));
    }

    record QuoteRequest(
        String customerId,
        String customerTier,
        String region,
        String promoCode,
        String requestedAt,
        List<QuoteItem> items
    ) {}

    record QuoteItem(
        String sku,
        Integer quantity,
        Integer unitPriceCents,
        String category
    ) {}
}

