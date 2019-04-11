FROM mhart/alpine-node:latest

WORKDIR /app
COPY . .

RUN npm install --prod

EXPOSE 3000
CMD ["node", "server.js"]