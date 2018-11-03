# From https://github.com/grpc/grpc/issues/6757 (thanks to https://github.com/blerest)

PASSWORD=password

rm *.crt *.key *.csr

# CA
openssl genrsa -passout pass:$PASSWORD -des3 -alias ca -out ca.key 4096
openssl req -passin pass:$PASSWORD -new -x509 -days 3650 -nameopt test ca -key ca.key -out ca.crt -subj "/C=FR/ST=Paris/L=Paris/O=Test/OU=CA/CN=ca"
# Server
openssl genrsa -passout pass:$PASSWORD -des3 -out server.key 4096
openssl req -passin pass:$PASSWORD -new -key server.key -out server.csr -subj "/C=FR/ST=Paris/L=Paris/O=Test/OU=Server/CN=localhost"
openssl x509 -req -passin pass:$PASSWORD -days 3650 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt
openssl rsa -passin pass:$PASSWORD -in server.key -out server.key
# Client
openssl genrsa -passout pass:$PASSWORD -des3 -out client.key 4096
openssl req -passin pass:$PASSWORD -new -key client.key -out client.csr -subj "/C=FR/ST=Paris/L=Paris/O=Test/OU=Client/CN=localhost"
openssl x509 -passin pass:$PASSWORD -req -days 3650 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt
openssl rsa -passin pass:$PASSWORD -in client.key -out client.key

# Display info
openssl x509 -in ca.crt -subject -enddate -noout
openssl x509 -in client.crt -subject -enddate -noout
openssl x509 -in server.crt -subject -enddate -noout
