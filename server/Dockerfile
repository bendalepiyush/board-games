FROM node:20.11.0

WORKDIR /usr/server

RUN npm install --global pm2

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "pm2-runtime", "npm", "--", "start" ]
