export interface Customer {
  id: number;
  name: string;
  website?: string;
  address?: string;
  created_on: Date;      // New field
  modified_on: Date;     // New field
}
