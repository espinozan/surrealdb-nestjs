import { Client, ClientGrpc } from '@nestjs/microservices';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { surrealDbClientOptions } from '../grpc.options';  // Importa las opciones correctamente

@Injectable()
export class SurrealdbGrpcService implements OnModuleInit {
  @Client(surrealDbClientOptions)
  private client: ClientGrpc;

  private surrealService: any;

  onModuleInit() {
    this.surrealService = this.client.getService<any>('SurrealService');
  }

  async getAllUsers() {
    return this.surrealService.getUsers();
  }
}
