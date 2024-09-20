import { Module, Global } from '@nestjs/common';
import { SurrealdbService } from './surrealdb.service';

@Global()  // Hacer accesible este módulo de forma global
@Module({
  providers: [SurrealdbService],
  exports: [SurrealdbService],
})
export class SurrealdbModule {}
