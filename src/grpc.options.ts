import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const surrealDbClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'surrealdb',
    protoPath: join(__dirname, './surrealdb.proto'),
  },
};
