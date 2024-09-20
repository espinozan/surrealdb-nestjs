import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SurrealdbService } from './surrealdb.service';

@Resolver('User')
export class SurrealdbResolver {
  constructor(private readonly surrealdbService: SurrealdbService) {}

  @Query(() => [Object])
  async users() {
    return await this.surrealdbService.getUsers();
  }

  @Mutation(() => Object)
  async createUser(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    return await this.surrealdbService.createUser(id, { name, age });
  }

  @Mutation(() => Object)
  async updateUser(
    @Args('id') id: string,
    @Args('name') name?: string,
    @Args('age') age?: number,
  ) {
    return await this.surrealdbService.updateUser(id, { name, age });
  }

  @Mutation(() => Object)
  async deleteUser(@Args('id') id: string) {
    return await this.surrealdbService.deleteUser(id);
  }
}
