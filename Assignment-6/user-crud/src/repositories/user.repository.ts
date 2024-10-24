import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MemorydbDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.memorydb') dataSource: MemorydbDataSource,
  ) {
    super(User, dataSource);
  }
}
