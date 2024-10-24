import { DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {User, Customer, Role} from '../models';
import {PgDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CustomerRepository} from './customer.repository';
import {RoleRepository} from './role.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  public readonly customer: BelongsToAccessor<Customer, typeof User.prototype.id>;
  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;

  constructor(
    @inject('datasources.pgDs') dataSource: PgDsDataSource,
    @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
    @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.customer = this.createBelongsToAccessorFor('customerId', customerRepositoryGetter);
    this.role = this.createBelongsToAccessorFor('roleId', roleRepositoryGetter);

    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
  }
}
