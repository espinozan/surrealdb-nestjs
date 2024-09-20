import { Injectable, OnModuleInit } from '@nestjs/common';
import Surreal from 'surrealdb.js';

@Injectable()
export class SurrealdbService implements OnModuleInit {
  private db: Surreal;

  constructor() {
    // Configuración inicial de la conexión a SurrealDB
    this.db = new Surreal('http://localhost:8000/rpc');
  }

  async onModuleInit() {
    await this.db.signin({
      user: 'root',  // usuario raíz
      pass: 'root',  // contraseña raíz
    });

    await this.db.use('test_ns', 'test_db');  // Namespace y base de datos
  }

  // Método para ejecutar consultas arbitrarias en SurrealSQL
  async runSurrealSQL(query: string): Promise<any> {
    const result = await this.db.query(query);
    return result;
  }

  // Ejemplo de operación SELECT
  async getUsers(): Promise<any> {
    return await this.db.select('user');
  }

  // Crear un nuevo registro en la tabla user
  async createUser(id: string, userData: any): Promise<any> {
    return await this.db.create(`user:${id}`, userData);
  }

  // Actualizar un usuario
  async updateUser(id: string, userData: any): Promise<any> {
    return await this.db.change(`user:${id}`, userData);
  }

  // Eliminar un usuario
  async deleteUser(id: string): Promise<any> {
    return await this.db.delete(`user:${id}`);
  }

  // Transacciones: Comenzar una transacción
  async startTransaction(): Promise<any> {
    return await this.db.query('BEGIN TRANSACTION');
  }

  // Confirmar una transacción
  async commitTransaction(): Promise<any> {
    return await this.db.query('COMMIT TRANSACTION');
  }

  // Revertir una transacción
  async rollbackTransaction(): Promise<any> {
    return await this.db.query('ROLLBACK TRANSACTION');
  }
}
