FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS builder
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_CAL_URL=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_CAL_URL=$NEXT_PUBLIC_CAL_URL
ENV DATABASE_URL="postgresql://app:app@localhost:5432/app"
COPY . .
RUN npx prisma generate && npx next build

FROM deps AS migrate
ENV DATABASE_URL="postgresql://app:app@db:5432/app"
COPY . .
RUN npx prisma generate
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.mjs"]

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/@genspark ./node_modules/@genspark
COPY --from=builder /app/node_modules/commander ./node_modules/commander
COPY --from=builder /app/node_modules/ws ./node_modules/ws
COPY --from=builder /app/node_modules/yazl ./node_modules/yazl
COPY --from=builder /app/node_modules/buffer-crc32 ./node_modules/buffer-crc32
EXPOSE 3000
CMD ["node", "server.js"]
