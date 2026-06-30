package com.codewalnut.exercises.quotes;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;

class QuoteServiceTest {
    private final QuoteService quoteService = new QuoteService();

    @Test
    void matchesReactPrototypeForGrowthCustomerWithSave10() {
        QuoteResponse response = quoteService.buildQuote(new QuoteRequest(
            QuoteRequest.CustomerTier.growth,
            QuoteRequest.Region.US,
            QuoteRequest.PromoCode.SAVE10,
            List.of(
                new QuoteItem("software-seat", 5, 120, QuoteItem.Category.software),
                new QuoteItem("implementation", 1, 900, QuoteItem.Category.services)
            )
        ));

        assertThat(response.subtotal()).isEqualTo(1500);
        assertThat(response.tierDiscount()).isEqualTo(105);
        assertThat(response.promoDiscount()).isEqualTo(150);
        assertThat(response.tax()).isEqualTo(102.71);
        assertThat(response.total()).isEqualTo(1347.71);
    }
}

