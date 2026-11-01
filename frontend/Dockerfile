# syntax=docker/dockerfile:1.7
# ---------- deps ----------
FROM node:22-alpine AS deps

WORKDIR /build

COPY package.json .

RUN --mount=type=cache,target=/root/.npm \
    npm install

# ---------- Common Git Stage ----------
FROM deps AS git-base

RUN --mount=type=cache,target=/var/cache/apt \
    apk update && \
    apk add git

# ----------- lib -------------

FROM git-base AS lib

WORKDIR /components

RUN git clone --depth=1 https://github.com/bearddaniel80-netizen/react-component-lib.git

# ---------- runtime ----------
FROM deps AS runtime

WORKDIR /app

COPY --from=deps /build/node_modules ./node_modules

COPY . .

# To generate docs
# RUN npm run docs

COPY --from=lib /components/react-component-lib src

CMD ["npm", "run", "dev"]