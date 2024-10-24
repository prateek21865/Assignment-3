export interface User {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone_number?: string;
  role_id?: number;
  customer_id?: number;
  address?: string;
  created_on: Date;      // New field
  modified_on: Date;     // New field
}
