src/
│
├── app/                                    # App shell — ONLY bootstrap & providers
│   ├── main.tsx                            ← STAYS (entry point)
│   └── main.scss                           ← STAYS (global style import)
│
├── assets/                                 ← STAYS (static assets, no logic)
│   ├── fonts/                              ← STAYS
│   ├── images/                             ← STAYS
│   └── styles/                             ← STAYS
│       ├── abstracts/                      ← STAYS
│       ├── base/                           ← STAYS
│       └── root/                           ← STAYS
│
├── core/                                   # Pure infrastructure — zero UI
│   ├── config/                             ← STAYS
│   │   ├── app.config.ts
│   │   ├── endpoints.config.ts
│   │   └── env.config.ts
│   ├── http/                               ← STAYS
│   │   ├── base-instance.ts
│   │   ├── client-builder.ts
│   │   ├── interceptors.ts
│   │   ├── query-error-handler.ts
│   │   └── refresh-token.ts
│   ├── lang/                               ← STAYS
│   │   ├── i18n.ts
│   │   └── i18n.types.ts
│   ├── monitoring/                         ← STAYS
│   │   ├── sentry.ts
│   │   ├── sentry-router-integration.tsx
│   │   └── sentry-user-sync.ts
│   └── test/                               ← MOVED from src/test/
│       ├── setup.ts                        # Fixes the vite.config path: ./src/core/test/setup.ts
│       ├── server.ts
│       └── handlers.ts
│
├── features/                               # One folder per vertical domain slice
│   │
│   ├── auth/                               ← NEW (extracted from app/store + features/login)
│   │   ├── api/                            ← NEW
│   │   │   └── auth.service.ts             ← NEW (placeholder for future auth API)
│   │   ├── model/                          
│   │   │   ├── auth.store.ts               ← MOVED from app/store/auth.store.ts
│   │   │   └── auth.types.ts               ← EXTRACTED from app/store/store.types.ts (AuthState)
│   │   ├── ui/
│   │   │   └── login-form/                 ← NEW (extract from login.page.tsx if applicable)
│   │   │       ├── login-form.ui.tsx
│   │   │       └── login-form.module.scss
│   │   ├── pages/
│   │   │   └── login.page.tsx              ← MOVED from features/login/login.page.tsx
│   │   └── base-instance.ts                        ← NEW (barrel: exports LoginPage, useAuthStore)
│   │
│   ├── home/                               ← ENRICHED (currently only 1 file)
│   │   ├── pages/
│   │   │   └── home.page.tsx               ← MOVED from features/home/home.page.tsx
│   │   └── base-instance.ts                        ← NEW (barrel: exports HomePage)
│   │
│   ├── post/                               ← RESTRUCTURED (already best example)
│   │   ├── api/                            ← STAYS
│   │   │   ├── post.keys.ts
│   │   │   ├── post.mutations.ts
│   │   │   ├── post.queries.ts
│   │   │   └── post.service.ts
│   │   ├── model/                          ← RENAMED from domain/
│   │   │   ├── post.dto.ts
│   │   │   ├── post.mapper.ts
│   │   │   ├── post.types.ts
│   │   │   └── post.schema.ts
│   │   ├── ui/                             ← STAYS
│   │   │   └── post-item/
│   │   │       ├── post-item.tsx
│   │   │       └── post-item.module.scss
│   │   ├── pages/                          ← NEW dir (pages pulled in)
│   │   │   ├── post-list.page.tsx          ← RENAMED from post.page.tsx
│   │   │   └── post-detail.page.tsx        ← MOVED from post-detail.page.tsx
│   │   ├── __tests__/                      ← NEW dir
│   │   │   └── post.page.test.tsx          ← MOVED from post.page.test.tsx
│   │   └── base-instance.ts                        ← NEW (barrel: exports PostListPage, PostDetailPage)
│   │
│   └── layout/                             ← NEW FEATURE (extracted from app/layouts)
│       ├── model/
│       │   ├── ui.store.ts                 ← MOVED from app/store/ui.store.ts
│       │   ├── ui.types.ts                 ← EXTRACTED from app/store/store.types.ts (UiState)
│       │   └── layout.types.ts             ← MOVED from app/layouts/public/model/public.types.ts
│       ├── ui/
│       │   ├── header/                     ← MOVED from app/layouts/public/ui/header/
│       │   ├── footer/                     ← MOVED from app/layouts/public/ui/footer/
│       │   ├── sidebar/                    ← MOVED from app/layouts/public/ui/sidebar/
│       │   └── sidebar-item/              ← MOVED from app/layouts/public/ui/sidebar-item/
│       ├── pages/
│       │   ├── auth.layout.tsx             ← MOVED from app/layouts/auth/auth.layout.tsx
│       │   ├── auth.module.scss            ← MOVED from app/layouts/auth/auth.module.scss
│       │   ├── auth.module.scss.d.ts       ← MOVED from app/layouts/auth/
│       │   ├── public.layout.tsx           ← MOVED from app/layouts/public/public.layout.tsx
│       │   ├── public.module.scss          ← MOVED from app/layouts/public/
│       │   ├── public.module.scss.d.ts     ← MOVED from app/layouts/public/
│       │   ├── error.layout.tsx            ← MOVED from app/layouts/error/
│       │   └── root.layout.tsx             ← MOVED from app/layouts/root/
│       └── base-instance.ts                        ← NEW (barrel: exports all layouts, useUiStore)
│
├── routes/                                 ← STAYS (TanStack Router file-based routing)
│   ├── __root.tsx                          ← STAYS (update imports to @features/layout)
│   ├── index.tsx                           ← STAYS
│   ├── routeTree.gen.ts                    ← AUTO-GENERATED
│   └── $locale/
│       ├── route.tsx                       ← STAYS (update imports)
│       ├── auth/
│       │   ├── route.tsx                   ← STAYS (update imports to @features/layout)
│       │   └── login/
│       │       └── index.tsx               ← STAYS (update: import LoginPage from @features/auth)
│       └── _public/
│           ├── route.tsx                   ← STAYS (update imports to @features/layout)
│           ├── index.tsx                   ← STAYS (update: import HomePage from @features/home)
│           └── post/
│               ├── index.tsx              ← STAYS (update: import PostListPage from @features/post)
│               ├── create/
│               │   └── index.tsx          ← STAYS (update imports)
│               └── $postId/
│                   └── index.tsx          ← STAYS (update imports)
│
├── shared/                                 ← STAYS (truly shared, feature-agnostic)
│   ├── hooks/
│   │   └── use-online-status.ts
│   ├── ui/
│   │   ├── button/                         ← MOVED from packages/button/
│   │   ├── form/                           ← MOVED from packages/form/
│   │   ├── form-field/                     ← MOVED from packages/form-field/
│   │   ├── grid/                           ← MOVED from packages/grid/
│   │   ├── input/                          ← MOVED from packages/input/
│   │   ├── modal/                          ← MOVED from packages/modal/
│   │   ├── select/                         ← MOVED from packages/select/
│   │   ├── table/                          ← MOVED from packages/table/
│   │   ├── table-actions/                  ← MOVED from packages/table-actions/
│   │   ├── content-wrapper/                ← STAYS
│   │   ├── error/                          ← STAYS
│   │   ├── loader/                         ← STAYS
│   │   └── base-instance.ts                        ← NEW (unified barrel for all shared UI)
│   └── utils/
│       ├── cookie.ts
│       ├── logger.ts
│       └── object-to-form-data.ts
│
└── (test/ REMOVED — moved to core/test/)
└── (packages/ REMOVED — merged into shared/ui/)
