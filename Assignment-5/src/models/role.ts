export interface Role {
  id: number;
  name: string;
  key: string;
  description?: string;
  created_on: Date;      // New field
  modified_on: Date;     // New field
}
