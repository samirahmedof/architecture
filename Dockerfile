# Build Stage
FROM ${DOCKER_PROXY}/node:20-alpine AS build

# 1. pnpm-i aktivləşdiririk (Node 20-də daxilidir, sadəcə aktiv etmək lazımdır)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 2. Lazımsız ENV silindi (--openssl-legacy-provider Vite üçün lazım deyil)

# 3. Yalnız pnpm lock faylını kopyalayırıq (npm package-lock.json yox)
COPY package.json pnpm-lock.yaml ./

# 4. Asılılıqları yükləyirik (--frozen-lockfile: lock faylını dəyişməz, CI üçün vacibdir)
RUN pnpm install --frozen-lockfile

COPY . .

# 5. Type check + Build
RUN pnpm build

# Runtime Stage (Nginx)
FROM ${DOCKER_PROXY}/nginx:1.27.5-alpine

EXPOSE 80

RUN rm -f /usr/share/nginx/html/*

# SPA Routing üçün Nginx config (Dəyişməyə ehtiyac yoxdur, TanStack Router üçün düzgündür)
RUN echo "server { listen 80; listen [::]:80; server_name localhost; root /usr/share/nginx/html; location / { try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]