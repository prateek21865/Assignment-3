import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  role?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

// This export allows the model to be used in other parts of your app
export interface UserRelations {
  // Add navigational properties here if needed
}

export type UserWithRelations = User & UserRelations;
