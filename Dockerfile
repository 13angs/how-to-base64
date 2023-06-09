# initial stage
FROM node:18-alpine3.16 AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
# RUN rm -rf .env && \
#     mv .env.sample .env
RUN npm run build

# runtime stage
FROM nginx:1.23.3-alpine AS runtime
EXPOSE 80
ENV TZ=Asia/Bangkok
RUN apk update && \
    apk add --no-cache tzdata
    
# delete all files inside /usr/share/nginx/html/ and in /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/* && \
    rm -rf /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]