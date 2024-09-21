import { Injectable, OnModuleInit } from '@nestjs/common';
import Surreal from 'surrealdb.js';

@Injectable()
export class SurrealdbService implements OnModuleInit {
  private db: Surreal;

  constructor() {
    this.db = new Surreal();  // Inicializa el cliente de SurrealDB sin opciones adicionales
  }

  async onModuleInit() {
    try {
      // Conexión a SurrealDB
      await this.db.connect('http://localhost:8000/rpc');
      
      // Iniciar sesión con las credenciales
      await this.db.signin({
        user: 'root',
        pass: 'root',
      });

      // Usar el namespace y base de datos
      await this.db.use({
        namespace: 'test_ns',
        database: 'test_db',
      });

      console.log('Conexión a SurrealDB establecida exitosamente');
      
    } catch (error) {
      // Si hay un error, capturarlo aquí
      console.error('Error al conectar con SurrealDB:', error.message);
    }
  }

  async runSurrealSQL(query: string): Promise<any> {
    return await this.db.query(query);
  }

  async getUsers(): Promise<any> {
    return await this.db.select('user');
  }

  async createUser(id: string, userData: any): Promise<any> {
    return await this.db.create(`user:${id}`, userData);
  }

  async updateUser(id: string, userData: any): Promise<any> {
    return await this.db.merge(`user:${id}`, userData);
  }

  async deleteUser(id: string): Promise<any> {
    return await this.db.delete(`user:${id}`);
  }
}
