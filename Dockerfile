# Build the application
FROM node:14.14-alpine3.12 AS builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ["package.json", "./package-lock.json", "/app/"]
RUN npm ci --silent
COPY "./" "/app/"
RUN npm run build
RUN npm prune --production


# Run it
FROM node:14.14-alpine3.12 AS runtime
WORKDIR /app
ENV PATH /usr/local/bin:/app/node_modules/.bin:$PATH
ENV NODE_ENV=production

COPY --from=builder "/app/build/" "/app/build/"

RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build"]
