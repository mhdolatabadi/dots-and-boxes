FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY . .

ENV NODE_ENV=production
EXPOSE 13797

CMD ["node", "index.js"]
