import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SurrealdbService } from './surrealdb.service';

@Controller('surrealdb')
export class SurrealdbController {
  constructor(private readonly surrealdbService: SurrealdbService) {}

  @Get()
  async getAllUsers(): Promise<any> {
    return await this.surrealdbService.getUsers();
  }

  @Post(':id')
  async createUser(@Param('id') id: string, @Body() userData: any): Promise<any> {
    return await this.surrealdbService.createUser(id, userData);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: any): Promise<any> {
    return await this.surrealdbService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.surrealdbService.deleteUser(id);
  }

  @Post('query')
  async runSurrealQuery(@Body() query: string): Promise<any> {
    return await this.surrealdbService.runSurrealSQL(query);
  }
}
