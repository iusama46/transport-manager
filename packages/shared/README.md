# Shared package

Reserved for provider-independent types, validation and business calculations shared by web and mobile. No package has been initialized yet. Keep server secrets and provider administration code out of mobile-consumable exports.

## Setup phase — 5 October 2026

The reservation above is historical. The private npm workspace `@transport-manager/shared` now exports a Zod placeholder schema and its inferred TypeScript type from `src/index.ts`. Next.js transpiles this source package directly; no separate build output is required. Future Expo tooling will need compatible source transpilation. No financial rules, provider integrations or database models have been added.
