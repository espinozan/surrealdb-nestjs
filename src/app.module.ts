import { Module } from '@nestjs/common';
import { SurrealdbModule } from './surrealdb/surrealdb.module';
import { SurrealdbController } from './surrealdb/surrealdb.controller';
import { SurrealdbResolver } from './surrealdb/surrealdb.resolver';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';



@Module({
  imports: [
    SurrealdbModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [SurrealdbController],
  providers: [SurrealdbResolver],
})
export class AppModule {}
