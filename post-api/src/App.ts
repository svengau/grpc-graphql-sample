/// <reference path="mali.d.ts" />

import mongoose from 'mongoose';
import fs from 'fs';
import * as grpc from 'grpc';
import Mali from 'mali';

import PostService from './services/Post';
import HealthService from './services/Health';

function auth(apiKey: string) {
  return async function(ctx: any, next: any) {
    const apiKeyProvided:string = ctx.request.get('x-api-key');

    if (!apiKeyProvided ||apiKeyProvided !== apiKey) {
      console.error(`Invalid apiKey: ${apiKey} when trying to service ${ctx.fullName}`);
      throw new Error('invalid.apiKey');
    }
    await next();
  }
}

class App {
  server: any;
  databaseUrl: string;
  port: number;

  public constructor(databaseUrl: string, port: number) {
    this.databaseUrl = databaseUrl;
    this.port = port;
   }

  public async start(this: App) {
    await mongoose.connect(this.databaseUrl, { useNewUrlParser: true });

    this.server = new Mali()
    this.server.on('error', (err:any, ctx:any) => {
      console.error('server error for call %s of type %s', ctx.name, ctx.type, err);
    })
    this.server.addService(PostService.protoPath, 'PostService');
    this.server.addService(HealthService.protoPath);
    this.server.use('PostService', auth('myapikey'));
    this.server.use(PostService.implementation)
    this.server.use(HealthService.implementation);

    const credentials = grpc.ServerCredentials.createSsl(
      fs.readFileSync(__dirname + '/cert/ca.crt'),
      [{
        cert_chain: fs.readFileSync(__dirname + '/cert/server.crt'),
        private_key: fs.readFileSync(__dirname + '/cert/server.key')
      }],
      true);

    this.server.start(`0.0.0.0:${this.port}`, credentials);
    //this.server.start();
    console.info('server started');
  }

  public async stop() {
    this.server.stop()
  }
}

export default App;
