# Architecture Review — Feature-Based Architecture Compliance

> **Project**: ARCHİTECTURE-V4  
> **Stack**: React 19 · TypeScript 5.9 · Vite 7 · TanStack Router/Query · Zustand · SCSS Modules · Valibot  
> **Review Date**: 2026-03-10  
> **Verdict**: The project demonstrates a **solid foundational understanding** of Feature-Based Architecture but has **critical structural inconsistencies, naming violations, coupling leaks, and missing scaffolding** that will degrade as the codebase scales.

---

## Table of Contents

1. [Current Directory Tree](#1-current-directory-tree)
2. [Naming & Placement Violations](#2-naming--placement-violations)
3. [Structural Modifications (Recommendations)](#3-structural-modifications-recommendations)
4. [Feature-Based Architecture Compliance](#4-feature-based-architecture-compliance)
5. [DX & Clean Code Assessment](#5-dx--clean-code-assessment)
6. [Optimal Refactored Directory Tree](#6-optimal-refactored-directory-tree)

---

## 1. Current Directory Tree

```
src/
├── app/
│   ├── http/
│   │   ├── base-instance.ts
│   │   ├── client-builder.ts
│   │   ├── query-error-handler.ts
│   │   ├── interceptors.ts
│   │   └── refresh-token.ts
│   ├── lang/
│   │   ├── i18n.types.ts              ← typo in filename
│   │   └── i18n.ts
│   ├── monitoring/
│   │   ├── sentry-router-integration.tsx
│   │   ├── sentry-user-sync.ts
│   │   └── sentry.ts
│   ├── providers/
│   │   ├── app-providers.tsx
│   │   ├── i18n-provider.tsx
│   │   ├── query-provider.tsx
│   │   ├── router-provider.tsx
│   │   └── sentry-provider.tsx
│   ├── test/
│   │   ├── handlers.ts
│   │   ├── server.ts
│   │   └── setup.ts
│   ├── main.scss
│   └── main.tsx
├── assets/
│   ├── fonts/
│   │   ├── imperial-script/
│   │   ├── nunito/
│   │   └── pf-square-sans-pro/
│   ├── images/
│   │   ├── juan.webp
│   │   ├── logout.webp
│   │   ├── notfound.svg
│   │   └── sima-negative.svg
│   └── styles/
│       ├── abstracts/ (_functions, _mixins, _variables, index)
│       ├── base/ (_common, _font-faces, _reset, index)
│       └── root/ (_fonts, _palette, _sizes, _theme, _tokens, index)
├── features/
│   ├── home/
│   │   ├── index.ts
│   │   └── pages/
│   │       └── home.page.tsx
│   ├── login/
│   │   ├── index.ts
│   │   └── pages/
│   │       └── login.page.tsx
│   └── post/
│       ├── api/
│       │   ├── post.keys.ts
│       │   ├── post.mocks.ts
│       │   ├── post.mutations.ts
│       │   ├── post.queries.ts
│       │   └── post.service.ts
│       ├── domain/
│       │   ├── post.dto.ts
│       │   ├── post.mapper.ts
│       │   ├── post.model.ts
│       │   └── post.schema.ts
│       ├── index.ts
│       ├── pages/
│       │   ├── post-detail.page.test.tsx
│       │   ├── post-detail.page.tsx
│       │   ├── post.page.test.tsx
│       │   └── post.page.tsx
│       └── ui/
│           └── post-item/
│               ├── post-item.module.scss
│               └── post-item.tsx
├── layouts/
│   ├── auth/
│   │   ├── auth.layout.tsx
│   │   ├── auth.module.scss
│   │   └── auth.module.scss.d.ts
│   ├── error/
│   │   └── error.layout.tsx
│   ├── public/
│   │   ├── footer/
│   │   │   ├── footer.module.scss
│   │   │   ├── footer.module.scss.d.ts
│   │   │   └── footer.tsx
│   │   ├── header/
│   │   │   ├── header.module.scss
│   │   │   ├── header.module.scss.d.ts
│   │   │   └── header.tsx
│   │   ├── public.layout.tsx
│   │   ├── public.module.scss
│   │   ├── public.module.scss.d.ts
│   │   ├── public.types.ts
│   │   ├── sidebar/
│   │   │   ├── sidebar.module.scss
│   │   │   ├── sidebar.module.scss.d.ts
│   │   │   └── sidebar.tsx
│   │   └── sidebar-item/
│   │       ├── sidebar-item.module.scss
│   │       ├── sidebar-item.module.scss.d.ts
│   │       └── sidebar-item.tsx
│   └── root/
│       ├── root.layout.test.tsx
│       └── root.layout.tsx
├── routes/
│   ├── $locale/
│   │   ├── _public/
│   │   │   ├── index.tsx
│   │   │   ├── post/
│   │   │   │   ├── $postId/
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── create/
│   │   │   │   │   └── index.tsx
│   │   │   │   └── index.tsx
│   │   │   └── route.tsx
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── index.tsx
│   │   │   └── route.tsx
│   │   └── route.tsx
│   ├── __root.tsx
│   ├── index.tsx
│   └── routeTree.gen.ts
└── shared/
    ├── config/
    │   ├── app.config.ts
    │   ├── endpoints.config.ts
    │   └── env.config.ts
    ├── hooks/
    │   └── use-online-status.ts
    ├── store/
    │   ├── auth.store.ts
    │   ├── store.types.ts
    │   └── ui.store.ts
    ├── ui/
    │   ├── button/
    │   ├── content-wrapper/
    │   ├── error/
    │   ├── form/
    │   ├── form-field/
    │   ├── grid/
    │   ├── index.ts
    │   ├── input/
    │   ├── loader/
    │   ├── modal/
    │   ├── select/
    │   ├── table/
    │   └── table-actions/
    └── utils/
        ├── cookie.ts
        ├── logger.ts
        └── object-to-form-data.ts
```

---

## 2. Naming & Placement Violations

### 2.1 Filename Errors

| # | File | Issue | Correct Name |
|---|------|-------|-------------|
| 1 | `src/app/lang/i18n.types.ts` | Missing `n` — typo in filename. Convention is `i18n`. | `i18n.types.ts` |
| 2 | `src/shared/ui/error/error-fallback.tsx` | Component file is named `main-error` but it lives inside a folder called `error`. The folder name is overly generic for a UI kit. Either rename the folder to `main-error` to match the component, or rename the component to `error-fallback.tsx` for semantic clarity. | Folder: `error-fallback/` or file: `error-fallback.tsx` |
| 3 | `src/features/post/ui/post-item/post-item.tsx` | The `.ui.tsx` suffix is an outlier. No other component file in the entire project uses this suffix. Pages use `.page.tsx`, layouts use `.layout.tsx`, but UI components simply use `.tsx`. | `post-item.tsx` |

### 2.2 Naming Convention Inconsistencies

| # | Pattern | Where Used | Violation |
|---|---------|-----------|-----------|
| 1 | `kebab-case` folders | `shared/ui/*`, `layouts/public/*`, `features/post/ui/*` | ✅ Consistent |
| 2 | `dot-notation` files | `post.service.ts`, `post.queries.ts`, `auth.store.ts` | ✅ Consistent |
| 3 | Component suffixes | `.page.tsx`, `.layout.tsx` | ⚠️ `post-item.tsx` breaks the pattern — no other UI component uses `.ui.tsx` |
| 4 | Config suffixes | `app.config.ts`, `env.config.ts`, `endpoints.config.ts` | ✅ Consistent |
| 5 | Store types | `store.types.ts` as a single monolith file | ⚠️ Mixes `AuthState` and `UiState` in one file. Should be co-located or split per-store. |
| 6 | Layout sub-components | `footer.tsx`, `header.tsx`, `sidebar.tsx` | ⚠️ Missing `.layout.tsx` or `.component.tsx` suffix — inconsistent with the parent `public.layout.tsx` |

### 2.3 Misplaced Files & Folders

| # | Current Location | Issue | Correct Location |
|---|-----------------|-------|-----------------|
| 1 | `src/shared/store/auth.store.ts` | Auth state is a **domain concern**, not a shared utility. It belongs to an `auth` feature. | `src/features/auth/store/auth.store.ts` |
| 2 | `src/shared/store/store.types.ts` | Monolith type file mixing `AuthState` + `UiState`. Each type should be co-located with its store. | Split: `auth.store.types.ts` + `ui.store.types.ts` (co-located with respective stores) |
| 3 | `src/shared/config/endpoints.config.ts` | Contains `AUTH.LOGIN`, `AUTH.REFRESH`, `POSTS.LIST`, etc. These are **feature-specific** endpoints mixed with shared endpoints. | Feature-specific endpoints should live inside their feature's `api/` directory. Only truly shared endpoints (e.g., `COMMON.UPLOAD`) should stay in `shared/config/`. |
| 4 | `src/features/login/` | "Login" is a page within the Authentication domain, not an independent feature. | `src/features/auth/pages/login.page.tsx` |
| 5 | `src/features/home/` | Home is a thin shell with zero domain logic (no api, no store, no domain model). It only exports a single page. This is not a "feature" — it is a page. | `src/features/dashboard/` or kept as `home` but requires domain justification |
| 6 | `src/layouts/public/public.types.ts` | Sidebar types (`SidebarProps`, `SidebarMenuItem`, `SidebarItemProps`, `FooterProps`) are defined in a monolith `public.types.ts` instead of being co-located. | Split to respective component folders: `sidebar/sidebar.types.ts`, `footer/footer.types.ts` |
| 7 | `src/app/http/query-error-handler.ts` | This file exports `queryClient` — a **QueryClient instance** bundled inside an error-handler file. The `queryClient` factory is an application-level concern, not an error-handler concern. | Extract `queryClient` creation to `src/app/providers/query-client.ts` or `src/app/query-client.ts` |
| 8 | `src/features/post/domain/post.schema.ts` | The validation schema uses a React hook (`usePostFormSchema` calls `useTranslation`). A file in a `domain/` folder should be pure — no React dependencies. | Move to `src/features/post/ui/schemas/post-form.schema.ts` or `src/features/post/hooks/use-post-schema.ts` |

---

## 3. Structural Modifications (Recommendations)

### 3.1 Deletions — Redundant / Obsolete

| # | Target | Reason |
|---|--------|--------|
| 1 | `src/shared/store/store.types.ts` | Monolith type file. Inline types into their respective store files or co-locate as `*.store.types.ts` alongside each store. |
| 2 | `src/features/login/` (as standalone feature) | Login is a subset of auth. Merge into `src/features/auth/`. |
| 3 | All `*.module.scss.d.ts` files | These are auto-generated by `typed-scss-modules`. They should be in `.gitignore` and regenerated on build. Committing them creates merge conflicts and stale types. |
| 4 | `dist/` directory | Build artifacts should not be committed. Already in `.gitignore`? Verify and remove from repository if tracked. |
| 5 | `.idea/` directory | IDE-specific config. Should be in `.gitignore`. |
| 6 | `.tanstack/` directory | Auto-generated by TanStack Router. Should be in `.gitignore`. |

### 3.2 Additions — Missing Structural Elements

| # | Missing Element | Location | Justification |
|---|----------------|----------|---------------|
| 1 | `src/features/auth/` (full feature) | `src/features/auth/` | Auth is a domain: it has login, register, token management, store, API endpoints. Currently fragmented across `shared/store/auth.store.ts`, `features/login/`, `app/http/refresh-token.ts`, `shared/config/endpoints.config.ts (AUTH section)`. |
| 2 | Feature-level `index.ts` barrel for `auth` | `src/features/auth/index.ts` | Public API boundary for the auth feature. |
| 3 | `src/shared/types/` directory | `src/shared/types/` | For genuinely shared types: API response wrappers, pagination types, utility types, generic form types. |
| 4 | `src/shared/lib/` directory | `src/shared/lib/` | For third-party library wrappers/adapters (e.g., the axios `client-builder.ts` pattern could be a shared lib if used by multiple API instances). |
| 5 | Per-feature `hooks/` directories | `src/features/*/hooks/` | Feature-specific hooks (like `usePostFormSchema`) should live in a dedicated `hooks/` directory within the feature, not under `domain/`. |
| 6 | `src/shared/ui/*/index.ts` per component | `src/shared/ui/button/index.ts` | Individual barrel files per component folder. Currently, the root `shared/ui/index.ts` deep-imports into component internals (e.g., `./button/button.tsx`). Each component should re-export through its own `index.ts`. |
| 7 | Test files alongside all features | `src/features/home/pages/home.page.test.tsx`, `src/features/login/pages/login.page.test.tsx` | `home` and `login` features have zero test coverage. Only `post` and `shared/ui/loader` have tests. |
| 8 | `src/shared/constants/` | `src/shared/constants/` | For application-wide magic values, regex patterns, enum-like constants that don't belong in `config/`. |
| 9 | Error layout styles | `src/layouts/error/error.module.scss` | The `error/` layout has only a `.tsx` file with no styles — likely incomplete. |

### 3.3 Refactoring — Merges & Splits

| # | Target | Action | Result |
|---|--------|--------|--------|
| 1 | `features/login/` + `shared/store/auth.store.ts` + auth endpoints | **Merge** into `features/auth/` | `features/auth/` with `api/`, `store/`, `pages/login/`, `domain/` |
| 2 | `shared/ui/index.ts` barrel | **Split** into per-component barrels | Each `shared/ui/<component>/index.ts` re-exports, root barrel re-exports from folders |
| 3 | `layouts/public/public.types.ts` | **Split** into co-located type files | `sidebar/sidebar.types.ts`, `footer/footer.types.ts` |
| 4 | `app/http/query-error-handler.ts` | **Split** `queryClient` out | `app/query-client.ts` + `app/http/query-error-handler.ts` (handler only) |
| 5 | `shared/store/` directory | **Restructure** — keep only UI store in shared | `shared/store/ui.store.ts` (truly shared) + move auth store to feature |

---

## 4. Feature-Based Architecture Compliance

### 4.1 Compliance Scorecard

| Principle | Status | Details |
|-----------|--------|---------|
| **Features are self-contained domains** | ⚠️ Partial | `post/` is well-structured (api, domain, pages, ui). `home/` and `login/` are hollow shells with zero domain logic. |
| **Features own their API layer** | ⚠️ Partial | `post/` owns its api. `login/` has none despite performing auth (uses `cookieUtils` directly). Auth API logic is scattered across `app/http/`. |
| **Features own their state** | ❌ Fail | `auth.store.ts` lives in `shared/store/` instead of an auth feature. `ui.store.ts` is appropriately shared. |
| **Public API via barrel exports** | ⚠️ Partial | Feature `index.ts` files exist but export internal types directly. No explicit public/private boundary enforcement. |
| **No cross-feature imports** | ✅ Pass | Routes import from feature barrels (`@features/post`, `@features/login`). No feature-to-feature direct imports detected. |
| **Shared layer is generic only** | ❌ Fail | `shared/store/auth.store.ts` is domain-specific. `shared/config/endpoints.config.ts` contains feature-specific endpoints. |
| **Routes are thin glue** | ✅ Pass | Route files are thin wrappers that lazy-load feature pages. Correct usage of `lazyRouteComponent`. |
| **Layouts are presentation-only** | ⚠️ Partial | `root.layout.tsx` mixes presentation with business logic (Sentry user sync, auth store reading). `public.layout.tsx` handles network status — borderline acceptable. |

### 4.2 Coupling Violations

#### Violation 1: Auth domain leaking into shared layer

```
src/shared/store/auth.store.ts    → Domain-specific state in shared
src/app/http/interceptors.ts      → Imports useAuthStore from shared
src/app/http/refresh-token.ts     → Imports useAuthStore from shared
src/shared/config/endpoints.config.ts → AUTH endpoints in shared config
```

**Impact**: Any feature that touches authentication is implicitly coupled to a non-feature location. Refactoring auth becomes a cross-cutting change.

#### Violation 2: QueryClient instantiation buried in error handler

```
src/app/http/query-error-handler.ts exports queryClient
src/app/main.tsx imports queryClient from error-handler
```

**Impact**: The QueryClient factory is an application concern. Coupling it to error-handling means you cannot change error strategy without risking QueryClient configuration.

#### Violation 3: Login feature has no domain

```
src/features/login/pages/login.page.tsx
  → imports cookieUtils from @shared/utils
  → imports Button from @shared/ui
  → has ZERO api/, domain/, store/ directories
```

**Impact**: `login` is not a feature — it is an orphaned page. Its auth logic (cookie manipulation, token storage) should belong to an `auth` feature with a proper service layer.

#### Violation 4: Domain layer contains React hooks

```
src/features/post/domain/post.schema.ts
  → exports usePostFormSchema() (uses useTranslation)
```

**Impact**: The `domain/` directory should contain pure business logic (types, mappers, validation rules). React hooks violate this boundary and make the domain layer untestable without a React context.

### 4.3 Feature Maturity Matrix

| Feature | `api/` | `domain/` | `pages/` | `ui/` | `hooks/` | `store/` | `index.ts` | Tests | Maturity |
|---------|--------|-----------|----------|-------|----------|----------|-----------|-------|----------|
| `post` | ✅ 5 files | ✅ 4 files | ✅ 4 files | ✅ 1 comp | ❌ | ❌ | ✅ | ✅ 2 | **High** |
| `login` | ❌ | ❌ | ✅ 1 file | ❌ | ❌ | ❌ | ✅ | ❌ | **Very Low** |
| `home` | ❌ | ❌ | ✅ 1 file | ❌ | ❌ | ❌ | ✅ | ❌ | **Very Low** |

---

## 5. DX & Clean Code Assessment

### 5.1 🚨 Must-Haves (Critical)

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 1 | **Auth domain fragmentation** | 🔴 Critical | Auth logic is scattered across 4+ directories (`shared/store`, `app/http`, `features/login`, `shared/config`). This is the most severe architectural violation. |
| 2 | **Filename typo: `i18n.types.ts`** | 🔴 Critical | Typo in a type augmentation file. Any developer searching for `i18n` will miss it. |
| 3 | **`queryClient` in error-handler** | 🔴 Critical | Application bootstrap is coupled to error-handling internals. |
| 4 | **React hook in domain layer** | 🔴 Critical | `usePostFormSchema` in `domain/` violates layer separation. Domain must be framework-agnostic. |
| 5 | **No per-component barrel exports** | 🟠 High | `shared/ui/index.ts` deep-imports into every component file. Adding a file to a component folder requires editing the root barrel. |
| 6 | **Hardcoded auth flag** | 🟠 High | `const isAuth = true; // TODO: real auth logic` in `routes/$locale/_public/route.tsx`. Bypasses real authentication. |
| 7 | **String template bug** | 🟠 High | `refresh-token.ts:60` — `Bearer {newAccessToken}` is missing the `$` for template literal interpolation. This is a runtime bug. |
| 8 | **Relative imports in route files** | 🟠 High | Route files use `../../../layouts/public/public.layout.tsx` instead of path aliases. Fragile and inconsistent with the rest of the codebase. |

### 5.2 💡 Nice-to-Haves (Improvements)

| # | Improvement | Impact |
|---|------------|--------|
| 1 | Add `@layouts` path alias | Eliminates deep relative imports in route files |
| 2 | Add `@shared/store` path alias | Currently imports `@shared/store/auth.store.ts` — works but could benefit from barrel re-export |
| 3 | Add `eslint-plugin-boundaries` or similar | Enforces feature isolation at lint time. Prevents cross-feature imports. |
| 4 | Co-locate test `__mocks__/` with features | `post.mocks.ts` in `api/` is good. Add `__tests__/` or `*.test.ts` files co-located with each module. |
| 5 | Add `README.md` per feature | Documents feature boundaries, public API, and dependencies for onboarding. |
| 6 | Move `.module.scss.d.ts` to `.gitignore` | Auto-generated files create merge conflicts. Regenerate on `dev`/`build`. |
| 7 | Use `as const satisfies` for config objects | `ENDPOINTS`, `APP`, `ENV` use `as const` but could benefit from `satisfies` for type-safe extension. |
| 8 | Extract shared `api/` types | Consider `shared/types/api.types.ts` for pagination, list responses, error shapes. |

### 5.3 ✅ Best Practices — What's Done Right

| # | Practice | Implementation |
|---|----------|----------------|
| 1 | **Dot-notation file naming** | Consistent across `*.service.ts`, `*.queries.ts`, `*.store.ts`, `*.config.ts`, `*.page.tsx`, `*.layout.tsx` |
| 2 | **DTO → Model mapping** | `post.dto.ts` + `post.mapper.ts` + `post.model.ts` — clean separation of API contracts from UI models |
| 3 | **Query key factory** | `post.keys.ts` — prevents key collision and enables scoped invalidation |
| 4 | **Lazy route loading** | `lazyRouteComponent()` with dynamic imports through barrel files |
| 5 | **Provider composition** | Clean provider nesting in `app-providers.tsx`: Sentry → I18n → Suspense → Query → Router |
| 6 | **HTTP client builder pattern** | `client-builder.ts` abstracts Axios, enabling multiple API instances with shared configuration |
| 7 | **SCSS architecture** | `abstracts/` (functions, mixins, variables) · `base/` (reset, common) · `root/` (tokens, palette, theme) follows ITCSS-inspired layering |
| 8 | **Global error handling** | Centralized error handler with Sentry integration, status-based toast messages, ValiError detection |
| 9 | **i18n namespace isolation** | Per-feature namespaces (`post`, `auth`, `validation`, `common`) with lazy namespace loading in route loaders |
| 10 | **Typed SCSS modules** | `typed-scss-modules` for compile-time CSS class validation |

---

## 6. Optimal Refactored Directory Tree

The following represents the target state that fully adheres to Feature-Based Architecture:

```
src/
├── app/                              # Application shell — initialization, providers, infra
│   ├── http/
│   │   ├── base-instance.ts          # Axios instance factory
│   │   ├── client-builder.ts         # Generic HTTP client wrapper
│   │   ├── query-error-handler.ts          # Global error handler (no queryClient export)
│   │   ├── interceptors.ts           # Request/response interceptors
│   │   └── refresh-token.ts          # Token refresh queue logic
│   ├── lang/
│   │   ├── i18n.ts            # i18next initialization
│   │   └── i18n.types.ts             # ← RENAMED from i18n.types.ts
│   ├── monitoring/
│   │   ├── sentry-router-integration.tsx
│   │   ├── sentry-user-sync.ts
│   │   └── sentry.ts
│   ├── providers/
│   │   ├── app-providers.tsx
│   │   ├── i18n-provider.tsx
│   │   ├── query-client.ts           # ← NEW: queryClient factory extracted here
│   │   ├── query-provider.tsx
│   │   ├── router-provider.tsx
│   │   └── sentry-provider.tsx
│   ├── test/
│   │   ├── handlers.ts
│   │   ├── server.ts
│   │   └── setup.ts
│   ├── main.scss
│   └── main.tsx
│
├── assets/                           # Static assets — no logic
│   ├── fonts/
│   │   ├── imperial-script/
│   │   ├── nunito/
│   │   └── pf-square-sans-pro/
│   ├── images/
│   │   ├── juan.webp
│   │   ├── logout.webp
│   │   ├── notfound.svg
│   │   └── sima-negative.svg
│   └── styles/
│       ├── abstracts/
│       ├── base/
│       └── root/
│
├── features/                         # Feature modules — self-contained domains
│   ├── auth/                         # ← MERGED: login + shared/store/auth + auth endpoints
│   │   ├── api/
│   │   │   ├── auth.keys.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.endpoints.ts     # ← MOVED from shared/config/endpoints (AUTH section)
│   │   ├── domain/
│   │   │   ├── auth.dto.ts
│   │   │   ├── auth.model.ts
│   │   │   └── auth.mapper.ts
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── pages/
│   │   │   ├── login.page.tsx
│   │   │   └── login.page.test.tsx
│   │   ├── store/
│   │   │   └── auth.store.ts         # ← MOVED from shared/store/
│   │   └── index.ts
│   │
│   ├── home/
│   │   ├── pages/
│   │   │   ├── home.page.tsx
│   │   │   └── home.page.test.tsx    # ← NEW: test coverage needed
│   │   └── index.ts
│   │
│   └── post/
│       ├── api/
│       │   ├── post.endpoints.ts     # ← MOVED from shared/config/endpoints (POSTS section)
│       │   ├── post.keys.ts
│       │   ├── post.mocks.ts
│       │   ├── post.mutations.ts
│       │   ├── post.queries.ts
│       │   └── post.service.ts
│       ├── domain/
│       │   ├── post.dto.ts
│       │   ├── post.mapper.ts
│       │   └── post.model.ts         # Pure types only
│       ├── hooks/
│       │   └── use-post-form-schema.ts  # ← MOVED from domain/post.schema.ts
│       ├── pages/
│       │   ├── post-detail.page.tsx
│       │   ├── post-detail.page.test.tsx
│       │   ├── post.page.tsx
│       │   └── post.page.test.tsx
│       ├── ui/
│       │   └── post-item/
│       │       ├── post-item.tsx      # ← RENAMED from post-item.tsx
│       │       └── post-item.module.scss
│       └── index.ts
│
├── layouts/                          # Layout shells — presentation only
│   ├── auth/
│   │   ├── auth.layout.tsx
│   │   └── auth.module.scss
│   ├── error/
│   │   ├── error.layout.tsx
│   │   └── error.module.scss         # ← NEW: missing styles
│   ├── public/
│   │   ├── footer/
│   │   │   ├── footer.tsx
│   │   │   ├── footer.types.ts       # ← SPLIT from public.types.ts
│   │   │   └── footer.module.scss
│   │   ├── header/
│   │   │   ├── header.tsx
│   │   │   └── header.module.scss
│   │   ├── sidebar/
│   │   │   ├── sidebar.tsx
│   │   │   ├── sidebar.types.ts      # ← SPLIT from public.types.ts
│   │   │   └── sidebar.module.scss
│   │   ├── sidebar-item/
│   │   │   ├── sidebar-item.tsx
│   │   │   ├── sidebar-item.types.ts # ← SPLIT from public.types.ts
│   │   │   └── sidebar-item.module.scss
│   │   ├── public.layout.tsx
│   │   └── public.module.scss
│   └── root/
│       ├── root.layout.tsx
│       └── root.layout.test.tsx
│
├── routes/                           # TanStack Router file-based routes — thin glue only
│   ├── $locale/
│   │   ├── _public/
│   │   │   ├── index.tsx
│   │   │   ├── post/
│   │   │   │   ├── $postId/
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── create/
│   │   │   │   │   └── index.tsx
│   │   │   │   └── index.tsx
│   │   │   └── route.tsx
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── index.tsx
│   │   │   └── route.tsx
│   │   └── route.tsx
│   ├── __root.tsx
│   ├── index.tsx
│   └── routeTree.gen.ts              # Auto-generated — should be in .gitignore
│
└── shared/                           # Genuinely shared utilities — zero domain logic
    ├── config/
    │   ├── app.config.ts
    │   ├── endpoints.config.ts       # Only COMMON endpoints remain
    │   └── env.config.ts
    ├── constants/                    # ← NEW
    │   └── regex.ts
    ├── hooks/
    │   └── use-online-status.ts
    ├── lib/                          # ← NEW: third-party wrappers
    │   └── axios/
    │       └── client-builder.ts     # Optional: extract if shared across multiple modules
    ├── store/
    │   └── ui.store.ts               # Only truly shared UI state
    ├── types/                        # ← NEW: shared generic types
    │   ├── api.types.ts              # Pagination, ApiResponse<T>, etc.
    │   └── utility.types.ts
    ├── ui/
    │   ├── button/
    │   │   ├── index.ts              # ← NEW per-component barrel
    │   │   ├── button.tsx
    │   │   ├── button.types.ts
    │   │   └── button.module.scss
    │   ├── content-wrapper/
    │   │   ├── index.ts
    │   │   ├── content-wrapper.tsx
    │   │   └── content-wrapper.module.scss
    │   ├── error-fallback/           # ← RENAMED from error/
    │   │   ├── index.ts
    │   │   ├── error-fallback.tsx
    │   │   └── error-fallback.module.scss
    │   ├── form/
    │   │   ├── index.ts
    │   │   ├── form.tsx
    │   │   └── form.types.ts
    │   ├── form-field/
    │   │   ├── index.ts
    │   │   ├── form-field.tsx
    │   │   ├── form-field.types.ts
    │   │   └── form-field.module.scss
    │   ├── grid/
    │   │   ├── index.ts
    │   │   ├── grid.tsx
    │   │   ├── grid.types.ts
    │   │   └── grid.module.scss
    │   ├── index.ts                  # Root barrel — re-exports from sub-barrels
    │   ├── input/
    │   │   ├── index.ts
    │   │   ├── input.tsx
    │   │   ├── input.types.ts
    │   │   └── input.module.scss
    │   ├── loader/
    │   │   ├── index.ts
    │   │   ├── loader.tsx
    │   │   ├── loader.test.tsx
    │   │   └── loader.module.scss
    │   ├── modal/
    │   │   ├── index.ts
    │   │   ├── modal.tsx
    │   │   └── modal.module.scss
    │   ├── select/
    │   │   ├── index.ts
    │   │   ├── select.tsx
    │   │   ├── select.types.ts
    │   │   └── select.module.scss
    │   ├── table/
    │   │   ├── index.ts
    │   │   ├── table.tsx
    │   │   ├── table.types.ts
    │   │   └── table.module.scss
    │   └── table-actions/
    │       ├── index.ts
    │       ├── table-actions.tsx
    │       └── table-actions.module.scss
    └── utils/
        ├── cookie.ts
        ├── logger.ts
        └── object-to-form-data.ts
```

---

## Summary of Violations by Severity

| Severity | Count | Key Issues |
|----------|-------|------------|
| 🔴 Critical | 4 | Auth fragmentation, filename typo, queryClient misplacement, React hook in domain |
| 🟠 High | 4 | Missing component barrels, hardcoded auth, string template bug, relative imports |
| 🟡 Medium | 6 | Type file monoliths, missing test coverage, login not a real feature, committed generated files |
| 🔵 Low | 5 | Missing path aliases, missing constants dir, no boundary lint rules, co-location improvements |

**Overall Feature-Based Architecture Compliance: ~55%**

The `post` feature is the gold standard in this codebase. If every feature followed its pattern (api → domain → pages → ui with barrel exports), the architecture score would be significantly higher. The most impactful single change is consolidating the `auth` domain into a proper feature module.
