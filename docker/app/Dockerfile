FROM alpine:latest
RUN apk update
RUN apk add npm git
RUN npm install pm2 -g
WORKDIR /
RUN git clone https://github.com/delta-12/dcs.git
WORKDIR /dcs/dcs
RUN npm install
RUN npm run build
WORKDIR /dcs/backend/config
COPY keys.js keys.js
WORKDIR /dcs/backend
RUN npm install
RUN echo "pm2 start server.js" >> run_pm2
RUN echo "tail -F /dev/null" >> run_pm2
ENTRYPOINT [ "/bin/ash", "run_pm2" ]