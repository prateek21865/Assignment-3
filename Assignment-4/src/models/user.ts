import { Role } from './role';
import { Customer } from './customer';

export interface User {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role?: Role;
  customer?: Customer;
  address?: string;
}
