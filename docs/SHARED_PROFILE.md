# Shared Caster Profile V1

Shared Profile V1 introduces a local-first preference layer and account gateway for Caster Hub.

## Included

- display name and email preference
- language and appearance preference
- default Caster application
- notification preference
- direct Scorecaster and Stockcaster account links
- machine-readable `/api/profile-readiness` status
- desktop and mobile navigation

## Storage boundary

The profile is stored only in browser localStorage under `caster-shared-profile-v1`.

Caster Hub does not store or copy:

- passwords
- access tokens
- refresh tokens
- payment information
- bookmaker credentials
- application sessions

Each production application remains responsible for its own authentication.

## Cloud migration gate

Shared cloud identity remains disabled until the implementation has:

1. a reviewed identity provider and redirect-domain policy
2. Row Level Security for all user-owned records
3. duplicate-safe local-to-cloud migration
4. account export and deletion
5. verified logout and session expiry
6. a controlled two-user isolation test

The local-first profile remains usable before cloud activation.
