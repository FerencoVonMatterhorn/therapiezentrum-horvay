FROM node:lts-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

FROM nginx:1.29-alpine AS production

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/dist/frontend /usr/share/nginx/html
