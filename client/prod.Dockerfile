FROM node:20.11.0

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

# RUN npm install --production

RUN chown -R node:node /usr/app

RUN npm install

COPY ./ ./

# RUN npm run build

EXPOSE 3000

USER node

#CMD [ "pm2-runtime", "npm", "--", "start" ]

CMD [  "npm", "run", "dev" ]