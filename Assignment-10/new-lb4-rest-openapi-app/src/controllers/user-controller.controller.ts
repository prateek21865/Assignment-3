import {post, get, put, del, param, requestBody} from '@loopback/rest';
import {inject} from '@loopback/core';
import {UserFacadeService} from '../services/user-facade-service.service';


export class UserController {
  constructor(
    @inject('services.UserFacadeService') private readonly userFacadeService: UserFacadeService,
  ) {}

  // Create a user
  @post('/users')
  async createUser(@requestBody() userData: object) {
    return this.userFacadeService.createUser(userData);
  }

  // Get all users
  @get('/users')
  async getUsers() {
    return this.userFacadeService.getUsers();
  }

  // Get a user by ID
  @get('/users/{id}')
  async getUserById(@param.path.string('id') userId: string) {
    return this.userFacadeService.getUserById(userId);
  }

  // Update a user by ID
  @put('/users/{id}')
  async updateUserById(
    @param.path.string('id') userId: string,
    @requestBody() userData: object,
  ) {
    return this.userFacadeService.updateUserById(userId, userData);
  }

  // Delete a user by ID
  @del('/users/{id}')
  async deleteUserById(@param.path.string('id') userId: string) {
    return this.userFacadeService.deleteUserById(userId);
  }
}
