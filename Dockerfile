# ============================================================
# Stage 1: Dependencies - 安装依赖（利用缓存层）
# ============================================================
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts && \
    npm cache clean --force

# ============================================================
# Stage 2: Builder - 构建组件库 + 文档站点
# ============================================================
FROM node:20-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build && npm run build:doc

# ============================================================
# Stage 3: Dev - 开发模式（可选，docker build --target dev）
# ============================================================
FROM node:20-alpine AS dev

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
    CMD wget -qO- http://localhost:5173/ || exit 1

CMD ["npm", "run", "dev"]

# ============================================================
# Stage 4: Production - nginx 提供文档站点服务（默认目标）
# ============================================================
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html/ea-ui-component

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
