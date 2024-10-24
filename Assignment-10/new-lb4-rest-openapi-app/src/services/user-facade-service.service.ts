import {inject, injectable, BindingScope} from '@loopback/core';
import {RestUserDataSource} from '../datasources';

@injectable({scope: BindingScope.TRANSIENT})
export class UserFacadeService {
  constructor(
    @inject('datasources.RestUserDataSource') private readonly dataSource: RestUserDataSource,
  ) {}

  async getUsers() {
    // Call the getUsers operation defined in the datasource
    const users = await (this.dataSource as any).getUsers();
    return users;
  }

  async createUser(userData: object) {
    const newUser = await (this.dataSource as any).createUser(userData);
    return newUser;
  }

  // Get a specific user by ID (Read)
  async getUserById(userId: string) {
    const user = await (this.dataSource as any).getUserById(userId);
    return user;
  }

  // Update a user by ID
  async updateUserById(userId: string, userData: object) {
    const updatedUser = await (this.dataSource as any).updateUserById(userId, userData);
    return updatedUser;
  }

  // Delete a user by ID
  async deleteUserById(userId: string) {
    const result = await (this.dataSource as any).deleteUserById(userId);
    return result;
  }
}
