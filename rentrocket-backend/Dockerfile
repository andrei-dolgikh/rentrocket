FROM node:18-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY src ./src

COPY .env ./.env

COPY tsconfig* ./

RUN mkdir -p /usr/src/app/uploads

RUN npx prisma generate
# RUN npx prisma db push

EXPOSE 4200

CMD ["npm", "start"]