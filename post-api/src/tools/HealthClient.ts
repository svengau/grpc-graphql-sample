import fs from 'fs';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const  packageDefinition = protoLoader.loadSync(__dirname + '/../services/Health/Health.proto');

const  proto:any = grpc.loadPackageDefinition(packageDefinition);

class HealthClient {

  static getInsecureClient(host: string) {
    return new proto.grpc.health.v1.Health(host, grpc.credentials.createInsecure());
  }

  static getSecureClient(host: string) {
    let credentials = grpc.credentials.createSsl(
      fs.readFileSync(__dirname + '/../cert/ca.crt'),
      fs.readFileSync(__dirname + '/../cert/client.key'),
      fs.readFileSync(__dirname + '/../cert/client.crt')
    );

    const options:any = {
      'grpc.ssl_target_name_override': 'localhost',
    };

    return new proto.grpc.health.v1.Health(host, credentials, options);
  }

}

export default HealthClient;
