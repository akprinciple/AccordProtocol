**Smart Contract — Security**

## Summary
`create_proposal` already calls an internal `validate_token` helper, but that helper has no test coverage and only checks two token interface methods. This issue hardens the validation and adds tests to confirm that passing an arbitrary address as the token is rejected.

## Background
The `validate_token` function in `contracts/accord/src/lib.rs` creates a `token::Client` from the supplied address and calls `try_decimals()` and `try_symbol()`. If either fails, it returns `ContractError::InvalidToken`. The function is called inside `create_proposal` before any storage is written. However, `test.rs` contains no test that exercises this rejection path — every existing test supplies a properly registered Stellar asset contract address.

## What Needs to Be Done

1. Extend `validate_token` to also call `try_name()` on the token client. Requiring three separate interface methods to succeed makes it significantly harder for a non-token contract or random address to pass validation by accident.
2. In `test.rs`, add a test named `create_proposal_rejects_invalid_token` that calls `create_proposal` with a freshly generated random `Address` (one that is not a registered contract) in the `token` field and asserts the call returns `ContractError::InvalidToken`.
3. In `test.rs`, add a test named `create_proposal_accepts_valid_token` that calls `create_proposal` with the standard registered Stellar asset contract address used in the existing `setup` helper and confirms the call succeeds.

## Acceptance Criteria
- [ ] `validate_token` checks at least three token interface methods before accepting an address.
- [ ] Calling `create_proposal` with a non-contract address in the `token` field returns `Err(ContractError::InvalidToken)`.
- [ ] Calling `create_proposal` with a properly registered token address succeeds.
- [ ] Both new tests pass under `cargo test`.
- [ ] No existing tests are broken.

## Files to Look At
- `contracts/accord/src/lib.rs` — `validate_token` (around line 272) and `create_proposal` where it is called
- `contracts/accord/src/test.rs` — the `setup` helper shows how a valid token is registered; use the same pattern to understand what an invalid address looks like

**Difficulty**: Medium