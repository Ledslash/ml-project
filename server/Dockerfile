FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8050

RUN npm run build
# CMD [ "pm2-runtime", "start", "dist/app.js" ]
CMD [ "pm2-docker", "dist/app.js" ]
