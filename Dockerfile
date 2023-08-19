FROM node:18-alpine as build

ENV NODE_ENV production

WORKDIR /react-app
COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

# Serve app with nginx
FROM nginx:1.25.1
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-app/build /usr/share/nginx/html
