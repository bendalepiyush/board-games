FROM node:20.11.0

WORKDIR /usr/server

RUN npm install --global pm2

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

#CMD [ "pm2-runtime", "npm", "--", "start" ]

CMD ["npx", "nodemon", "app.js"]