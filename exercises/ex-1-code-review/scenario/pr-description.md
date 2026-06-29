# PR: Checkout Credits and Webhook Cleanup

## Summary

This PR adds customer credit support to checkout pricing and simplifies webhook signature verification. It also tidies up the pricing flow so discounts, credits, taxes, and totals are easier to read.

## Claimed Behavior

- Customers can apply store credit to reduce the checkout total.
- Coupon discounts are still capped by `maxDiscountCents`.
- Expired coupons should not apply.
- Tax should be calculated after discounts and credits.
- Webhook signatures should continue to be verified before processing payment events.

## Notes From Author

- No database changes.
- No API contract changes expected.
- Existing tests passed locally.
- Added a development bypass to make local webhook testing easier.

