FROM node:14-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build && \
    npm prune --production

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

CMD [ "node", "." ]