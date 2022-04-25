FROM node:latest

WORKDIR /urs/src/app

COPY package.json ./

RUN npm install

COPY . .

USER node

EXPOSE 5000

CMD ["node", "src/index.js"]

