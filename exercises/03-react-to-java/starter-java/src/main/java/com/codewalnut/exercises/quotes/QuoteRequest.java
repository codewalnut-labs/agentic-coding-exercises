package com.codewalnut.exercises.quotes;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record QuoteRequest(
    @NotNull CustomerTier customerTier,
    @NotNull Region region,
    PromoCode promoCode,
    @NotEmpty List<@Valid QuoteItem> items
) {
    public enum CustomerTier {
        starter,
        growth,
        enterprise
    }

    public enum Region {
        US,
        EU,
        IN
    }

    public enum PromoCode {
        SAVE10,
        SERVICES15
    }
}

