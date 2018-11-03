FROM node:10.12.0-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN GRPC_HEALTH_PROBE_VERSION=v0.2.0 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

RUN npm install --production \
    && npm cache clean --force \
    && rm -rf /tmp/*

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start", "--silent" ]
