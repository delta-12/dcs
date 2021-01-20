FROM ubuntu:latest
ENV LC_CTYPE C.UTF-8
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get dist-upgrade -y
RUN apt-get install -y nginx certbot python3-certbot-nginx
RUN apt-get autoremove -y
RUN rm /etc/nginx/sites-available/* && rm /etc/nginx/sites-enabled/*
RUN rm /var/www/html/*
WORKDIR /etc/nginx/conf.d
COPY nginx.conf default.conf
WORKDIR /etc/nginx
COPY start_services.sh start_services.sh
ENTRYPOINT ["/bin/bash", "start_services.sh"]