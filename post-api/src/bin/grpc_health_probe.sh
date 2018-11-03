#!/bin/sh

# Doc: https://github.com/grpc-ecosystem/grpc-health-probe

BASEDIR=$(dirname "$0")

/bin/grpc_health_probe \
  -tls \
  -tls-server-name localhost \
  -tls-ca-cert $BASEDIR/../cert/ca.crt \
  -tls-client-cert $BASEDIR/../cert/client.crt \
  -tls-client-key $BASEDIR/../cert/client.key \
  -addr=$1
