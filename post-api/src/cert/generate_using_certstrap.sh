OPTIONS="-c FR --st Paris -l Paris -o Test --ou Test --passphrase password"
OUTPUT_DIR=.

rm *.crt *.key *.csr

certstrap --depot-path $OUTPUT_DIR init --expires "10 years" --cn ca $OPTIONS

certstrap --depot-path $OUTPUT_DIR request-cert --cn server $OPTIONS
certstrap --depot-path $OUTPUT_DIR sign server --expires "10 years" --CA ca --passphrase password

certstrap --depot-path $OUTPUT_DIR request-cert --cn client $OPTIONS
certstrap --depot-path $OUTPUT_DIR sign client --expires "10 years" --CA ca --passphrase password

# Display info
openssl x509 -in $OUTPUT_DIR/ca.crt -subject -enddate -noout
openssl x509 -in $OUTPUT_DIR/client.crt -subject -enddate -noout
openssl x509 -in $OUTPUT_DIR/server.crt -subject -enddate -noout
