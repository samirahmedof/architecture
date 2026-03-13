# Architecture Dependency Review — Unidirectional Flow Violations

> **Date**: 2026-03-11  
> **Enforced Hierarchy**: `app → routes → layouts → features → shared`  
> **Rule**: Upper layers may import from lower layers. Lower layers must NEVER import from upper layers.

---

## 1. Complete Violation Map

I scanned every file in the project. Here is every import that violates the declared hierarchy:

### `shared/` → `app/` (Severity: 🔴 Maximum — bottom layer importing from top)

| File | Violating Import |
|------|-----------------|
| `shared/ui/table-actions/table-actions.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |
| `shared/ui/error-fallback/error-fallback.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |

### `features/` → `app/` (Severity: 🔴 High — skips 3 layers)

| File | Violating Import |
|------|-----------------|
| `features/post/pages/post.page.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |
| `features/post/pages/post-detail.page.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |
| `features/post/domain/post.schema.ts` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |
| `features/post/api/post.service.ts` | `import { api } from '@app/http/base-instance.ts'` |
| `features/post/pages/post.page.test.tsx` | `import { server } from '@app/testing/server.ts'` |
| `features/login/pages/login.page.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |
| `features/home/pages/home.page.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |

### `layouts/` → `app/` (Severity: 🟠 High — skips 2 layers)

| File | Violating Import |
|------|-----------------|
| `layouts/root/root.layout.tsx` | `import { useSentryRouterTracking } from '@app/monitoring/...'` |
| `layouts/root/root.layout.tsx` | `import { syncSentryUser } from '@app/monitoring/...'` |
| `layouts/public/public.layout.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |
| `layouts/public/header/header.tsx` | `import { DEFAULT_LANGUAGE, Language, NAMESPACES } from '@app/i18n/...'` |
| `layouts/public/footer/footer.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |
| `layouts/public/sidebar/sidebar.tsx` | `import { DEFAULT_LANGUAGE } from '@app/i18n/i18n.ts'` |
| `layouts/public/public.types.ts` | `import type { Language } from '@app/i18n/i18n.ts'` |

### `routes/` → `app/` (Severity: 🟡 Moderate — one layer up)

| File | Violating Import |
|------|-----------------|
| `routes/__root.tsx` | `import type i18n from '@app/i18n/i18n.ts'` |
| `routes/__root.tsx` | `import type { createProjectRouter } from '@app/providers/...'` |
| `routes/index.tsx` | `import { DEFAULT_LANGUAGE } from '@app/i18n/i18n.ts'` |
| `routes/$locale/_public/post/index.tsx` | `import { NAMESPACES } from '@app/i18n/i18n.ts'` |
| `routes/$locale/route.tsx` | `import { DEFAULT_LANGUAGE, LANGUAGES, Language } from '@app/i18n/...'` |

**Total: 21 violations. 100% of layers violate the rule.**

---

## 2. Diagnosis: Why Is This Happening?

### The Rule Is Not Flawed — The Items Are Misplaced

Your unidirectional hierarchy `app → routes → layouts → features → shared` is a standard and correct architectural principle. The problem is that `app/i18n/i18n.ts` exports two categories of things with different dependency profiles:

**Category A — Application initialization (belongs in `app/`)**:
```ts
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({ ... });
export default i18n;  // The singleton instance
```
This is bootstrapping. It runs once. It configures backend paths, detection order, and plugin chains. Only `app/` should own this.

**Category B — Domain constants (belongs in `shared/`)**:
```ts
export const LANGUAGES = { AZ: 'az', EN: 'en', RU: 'ru' } as const;
export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];
export const DEFAULT_LANGUAGE: Language = LANGUAGES.AZ;
export const NAMESPACES = { COMMON: 'common', AUTH: 'auth', POST: 'post', VALIDATION: 'validation' } as const;
export type Namespace = (typeof NAMESPACES)[keyof typeof NAMESPACES];
```
These are **pure constants and types**. They have zero runtime dependencies. They don't initialize anything. They don't import from any library. They are consumed by every layer. They are the textbook definition of `shared/` content.

**Both categories are co-located in one file.** That's the root cause.

The same pattern applies to every other violation:
- `api` (the Axios client instance) lives in `app/` but is consumed by `features/`
- `syncSentryUser` lives in `app/` but is consumed by `layouts/`
- `server` (MSW) lives in `app/` but is consumed by `features/` tests

### Architectural Consequence

Allowing lower layers to import from `app/` creates **bidirectional coupling**:

```
app/ ←→ features/     ← circular dependency risk
app/ ←→ shared/       ← destroys the entire layering model
```

Concrete consequences:
1. **Refactoring `app/i18n/` breaks everything.** Renaming from `lang/` to `i18n/` (which you did) requires touching files in `shared/`, `features/`, `layouts/`, and `routes/`. A true `app/`-layer change should only affect `app/` files.
2. **`shared/` is no longer portable.** `shared/ui/table-actions.tsx` imports from `@app/`. You cannot extract `shared/` into a separate package — it depends on your application.
3. **Feature isolation is an illusion.** `features/post/api/post.service.ts` imports `api` from `app/`. The feature cannot be tested or developed without the full app infrastructure.

---

## 3. Resolution Strategy

### 3.1 The Principle

**`app/` must only contain code that is consumed by `app/` itself and by `main.tsx`.** If something in `app/` is needed by a lower layer, that thing is misplaced and must move down to `shared/`.

The test: **After the fix, `grep -r "@app/" src/features src/layouts src/shared` must return zero results.** The only layer permitted to import from `app/` is `routes/` — and only for specific, justified exceptions (see 3.5).

### 3.2 Fix 1: i18n Constants → `shared/config/`

**Problem**: `NAMESPACES`, `LANGUAGES`, `DEFAULT_LANGUAGE`, `Language`, `Namespace` are pure constants consumed by 15+ files across all layers.

**Solution**: Extract them into a new file in `shared/config/`:

```
shared/config/
├── app.config.ts
├── env.config.ts
├── endpoints.config.ts
└── i18n.ts          ← NEW: pure constants only
```

```ts
// shared/config/i18n.ts — pure constants, ZERO library imports
export const LANGUAGES = {
  AZ: 'az',
  EN: 'en',
  RU: 'ru',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];
export const DEFAULT_LANGUAGE: Language = LANGUAGES.AZ;

export const NAMESPACES = {
  COMMON: 'common',
  AUTH: 'auth',
  POST: 'post',
  VALIDATION: 'validation',
} as const;

export type Namespace = (typeof NAMESPACES)[keyof typeof NAMESPACES];
```

```ts
// app/i18n/i18n.ts — MODIFIED: imports constants from shared, owns initialization
import { DEFAULT_LANGUAGE, LANGUAGES, NAMESPACES } from '@shared/config/i18n.ts';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
// ... rest of initialization

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: Object.values(LANGUAGES),
  defaultNS: NAMESPACES.COMMON,
  ns: Object.values(NAMESPACES),
  // ...
});

export default i18n; // Only the singleton is exported from app/
```

**Import changes across the codebase**:

```diff
  // In ALL features, layouts, shared components:
- import { NAMESPACES } from '@app/i18n/i18n.ts';
+ import { NAMESPACES } from '@shared/config/i18n.ts';

- import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '@app/i18n/i18n.ts';
+ import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '@shared/config/i18n.ts';
```

**Files to update** (15 files):
- `shared/ui/table-actions/table-actions.tsx`
- `shared/ui/error-fallback/error-fallback.tsx`
- `features/post/pages/post.page.tsx`
- `features/post/pages/post-detail.page.tsx`
- `features/post/domain/post.schema.ts`
- `features/login/pages/login.page.tsx`
- `features/home/pages/home.page.tsx`
- `layouts/public/public.layout.tsx`
- `layouts/public/header/header.tsx`
- `layouts/public/footer/footer.tsx`
- `layouts/public/sidebar/sidebar.tsx`
- `layouts/public/public.types.ts`
- `routes/index.tsx`
- `routes/$locale/_public/post/index.tsx`
- `routes/$locale/route.tsx`

### 3.3 Fix 2: `api` Axios Instance → `shared/lib/`

**Problem**: `features/post/api/post.service.ts` imports `api` from `@app/http/base-instance.ts`.

**Analysis**: The `api` object is the return value of `createHttpClient(defaultAxiosInstance)`. The feature needs an HTTP client to call endpoints. But the feature should not know *which* Axios instance was used, *what* interceptors are attached, or *where* the base URL comes from.

**Solution**: Expose the `api` client through `shared/` via a re-export pattern. The Axios instance creation and interceptor attachment stays in `app/`. The resulting client is made available to lower layers through `shared/`.

```ts
// app/api/base-instance.ts — unchanged: creates and configures instances
import { createHttpClient } from './client-builder.ts';
// ... axios.create, attachInterceptors, etc.
export const api = createHttpClient(defaultAxiosInstance);
```

```ts
// shared/lib/api-client.ts — NEW: re-exports the configured client
// This file is the bridge. It's set by app/ at bootstrap, consumed by features/.
import type { createHttpClient } from '@app/http/client-builder.ts'; // type-only for inference

type HttpClient = ReturnType<typeof createHttpClient>;

let _api: HttpClient;

export const setApiClient = (client: HttpClient) => { _api = client; };
export const getApiClient = (): HttpClient => {
  if (!_api) throw new Error('API client not initialized. Call setApiClient() in app bootstrap.');
  return _api;
};
```

Wait — this introduces a runtime registration pattern that adds complexity and a potential null reference. For a project of your size, this is over-engineering.

**Pragmatic alternative**: Accept that feature services need the HTTP client and allow this single, specific `@app/` import in feature `api/` files. Document it as a **controlled exception**:

```ts
// features/post/api/post.service.ts
// ARCHITECTURAL EXCEPTION: Features import the configured HTTP client from app/.
// This is the only permitted @app/ import in feature code.
import { api } from '@app/http/base-instance.ts';
```

**Or** move `base-instance.ts` and `client-builder.ts` to `shared/lib/`:

```
shared/lib/
├── http-client.ts              # createHttpClient (generic Valibot wrapper)
└── api-instance.ts             # Configured Axios instance(s) with interceptors
```

But this pushes interceptor wiring (which uses `useAuthStore` and `refresh-token`) into `shared/`, which violates the rule that `shared/` must not contain app-specific logic.

**Verdict**: The HTTP client is a **genuine architectural tension** in layered frontend architectures. There are three valid approaches:

| Approach | Trade-off |
|----------|-----------|
| A. Allow `features/ → @app/api` as documented exception | Small rule violation, zero complexity |
| B. Dependency injection (pass `api` via React context) | Pure but adds provider boilerplate |
| C. Module-level registration (`setApiClient()` at bootstrap) | Pure but adds runtime null risk |

**Recommendation: Approach A.** For your project size, one documented exception is better than an abstraction layer that exists solely to satisfy a rule. The import of `api` from `app/` is predictable, stable, and unlikely to cause refactoring pain.

### 3.4 Fix 3: Sentry Utilities → Root Layout Responsibility

**Problem**: `layouts/root/root.layout.tsx` imports `useSentryRouterTracking` and `syncSentryUser` from `@app/monitoring/`.

**Solution**: Move the monitoring effects out of the layout entirely. They should execute in `app/`, not `layouts/`.

Create a non-visual component in `app/providers/`:

```tsx
// app/providers/monitoring-provider.tsx — NEW
import { useSentryRouterTracking } from '@app/monitoring/sentry-router-integration';
import { syncSentryUser } from '@app/monitoring/sentry-user-sync';
import { useAuthStore } from '@shared/store/auth.store';
import { useEffect, type ReactNode } from 'react';

export const MonitoringProvider = ({ children }: { children: ReactNode }) => {
  useSentryRouterTracking();
  const token = useAuthStore((s) => s.accessToken);
  useEffect(() => { syncSentryUser(token); }, [token]);
  return <>{children}</>;
};
```

Wrap it in `app-providers.tsx` and **remove** all `@app/monitoring` imports from `root.layout.tsx`.

> **Note**: `useSentryRouterTracking` requires TanStack Router context, which is only available inside the router tree. If this hook must run inside the router tree (below `<RouterProvider>`), then it **must** live in either a layout or a route component — it cannot run in `app/providers/` which wraps outside the router. In that case, the monitoring imports in `root.layout.tsx` are a **forced architectural exception**. Document it:

```tsx
// layouts/root/root.layout.tsx
// ARCHITECTURAL EXCEPTION: These monitoring hooks require router context,
// which only exists inside the router tree. Cannot be lifted to app/providers/.
import { useSentryRouterTracking } from '@app/monitoring/sentry-router-integration';
```

### 3.5 Fix 4: Route-Level `@app/` Imports — Justified Exception

**Problem**: `routes/__root.tsx` imports `i18n` type and `createProjectRouter` type from `@app/`.

**Analysis**: TanStack Router's `__root.tsx` is architecturally unique. It defines the root route context (`MyRouterContext`) which requires the `QueryClient` type and the `i18n` instance type. These types come from `app/` because `app/` is where these singletons are created.

```ts
import type i18n from '@app/i18n/i18n.ts';      // type-only
import type { createProjectRouter } from '@app/providers/router-provider.tsx'; // type-only
```

Both are **type-only imports**. They do not create runtime dependencies. They exist solely for TypeScript's type inference of the router context.

**Verdict**: This is an acceptable exception. `routes/` is one layer below `app/` in your hierarchy. The imports are type-only. TanStack Router's file-based routing requires the root route to know the context shape, which is defined by `app/`. There is no clean way to avoid this without losing type safety.

After extracting `NAMESPACES`/`LANGUAGES`/`DEFAULT_LANGUAGE` to `shared/config/i18n.ts`, the remaining `routes/ → @app/` imports will be:
1. `__root.tsx` — type imports for router context (exception)
2. All constant imports — eliminated (moved to `shared/`)

### 3.6 Fix 5: Test Imports — Scoped Override

**Problem**: `features/post/pages/post.page.test.tsx` imports `server` from `@app/testing/server.ts`.

**Analysis**: Test files are not production code. They do not participate in the runtime dependency graph. The MSW server is global test infrastructure that must be accessible from any test file.

**Verdict**: Test imports are exempt from the production dependency hierarchy. The import `@app/testing/server.ts` in a `.test.tsx` file is architecturally correct. Tests are infrastructure consumers, not architectural layers.

If you want to be strict, scope the exception with a lint rule that allows `@app/testing/*` imports **only** in `*.test.{ts,tsx}` files.

---

## 4. Summary of Resolutions

| Violation | Count | Resolution | Type |
|-----------|-------|-----------|------|
| `NAMESPACES`, `LANGUAGES`, `DEFAULT_LANGUAGE`, `Language`, `Namespace` imported from `@app/i18n/` | 15 | **Move constants** to `shared/config/i18n.ts` | Fix |
| `api` imported from `@app/http/base-instance.ts` | 1 | **Documented exception** — features need the configured HTTP client | Exception |
| `syncSentryUser`, `useSentryRouterTracking` in layouts | 2 | **Lift to `app/providers/`** if possible, or **documented exception** if router context required | Fix or Exception |
| `i18n` type, `createProjectRouter` type in `__root.tsx` | 2 | **Permitted** — type-only, one layer up, required by TanStack Router | Exception |
| `server` in test files | 1 | **Exempt** — tests are not production architecture | Exempt |

### After Fixes

```
grep -r "@app/" src/shared/       → 0 results  ✅
grep -r "@app/" src/features/     → 1 result   (api import — documented exception)
grep -r "@app/" src/layouts/      → 0-2 results (monitoring — depends on router context)
grep -r "@app/" src/routes/       → 2 results   (type-only — permitted exception)
```

### What Belongs ONLY in `app/`

After this refactoring, `app/` contains exclusively:

| Content | Example | Consumed By |
|---------|---------|-------------|
| Singleton initialization | `i18n.init()`, `Sentry.init()`, `new QueryClient()` | `app/` only |
| Instance wiring | `axios.create()` + interceptor attachment | `app/` → exposed to features as exception |
| React provider composition | `<AppProviders>`, `<QueryClientProvider>`, etc. | `app/main.tsx` only |
| Router factory | `createRouter({ routeTree, context })` | `app/` → type consumed by routes |
| Test infrastructure | MSW server lifecycle | Test files only (exempt) |

Everything else — constants, types, utilities, hooks, UI components, stores — belongs in `shared/` or their respective feature.

---

## 5. File Movement Checklist

```
MOVE  (content, not file):
  Constants from app/i18n/i18n.ts → shared/config/i18n.ts
  - LANGUAGES, Language
  - DEFAULT_LANGUAGE
  - NAMESPACES, Namespace

CREATE:
  shared/config/i18n.ts

MODIFY (update imports in 15 files):
  shared/ui/table-actions/table-actions.tsx
  shared/ui/error-fallback/error-fallback.tsx
  features/post/pages/post.page.tsx
  features/post/pages/post-detail.page.tsx
  features/post/domain/post.schema.ts
  features/login/pages/login.page.tsx
  features/home/pages/home.page.tsx
  layouts/public/public.layout.tsx
  layouts/public/header/header.tsx
  layouts/public/footer/footer.tsx
  layouts/public/sidebar/sidebar.tsx
  layouts/public/public.types.ts
  routes/index.tsx
  routes/$locale/_public/post/index.tsx
  routes/$locale/route.tsx

MODIFY (update internal import):
  app/i18n/i18n.ts → import constants from @shared/config/i18n.ts

OPTIONAL:
  Create app/providers/monitoring-provider.tsx
  Remove monitoring imports from layouts/root/root.layout.tsx
```
