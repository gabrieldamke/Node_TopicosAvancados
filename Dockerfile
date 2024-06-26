FROM node:lts-slim

WORKDIR /app


COPY package*.json ./
RUN npm install && npm install typescript -g


COPY . .

EXPOSE 3000

CMD ["npm", "start"]