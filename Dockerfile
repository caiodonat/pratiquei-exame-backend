FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3333

CMD ["nginx", "-g", "daemon off;"]
