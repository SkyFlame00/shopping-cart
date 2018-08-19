# Shopping cart app

This app partially mimics buying process chain in an online shop. There are two steps of the process available: inserting user's private data and choosing goods user is going to buy. Total price is calculated as well as total discount.

## Launch

```
ng serve
```

## Notes

* Fields on the first tab are not properly validated, only the test on emptiness is done. However, on the second tab there are sufficient validation tests on fields.
* For simplicity's sake (to test against pagination and rows displaying), on the second tab data is generated automatically (in `mock-data.ts`).
