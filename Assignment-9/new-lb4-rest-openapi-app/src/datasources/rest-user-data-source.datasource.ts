import {juggler} from '@loopback/repository';
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';

const config = {
  name: 'RestUserDataSource',
  connector: 'rest',
  baseURL: 'http://localhost:3000/users', // Adjust this to the correct base URL of your API
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
    },
  },
  operations: [
    // Read (GET) all users
    {
      template: {
        method: 'GET',
        url: '/users',
      },
      functions: {
        getUsers: [],
      },
    },
    // Create (POST) a new user
    {
      template: {
        method: 'POST',
        url: '/users',
        body: '{body}',  // Include the body in the POST request
      },
      functions: {
        createUser: ['body'],
      },
    },
    // Read (GET) a specific user by ID
    {
      template: {
        method: 'GET',
        url: '/users/{id}',
      },
      functions: {
        getUserById: ['id'],
      },
    },
    // Update (PUT) a user by ID
    {
      template: {
        method: 'PUT',
        url: '/users/{id}',
        body: '{body}',  // Include the body for the update
      },
      functions: {
        updateUserById: ['id', 'body'],
      },
    },
    // Delete (DELETE) a user by ID
    {
      template: {
        method: 'DELETE',
        url: '/users/{id}',
      },
      functions: {
        deleteUserById: ['id'],
      },
    },
  ],
};

@lifeCycleObserver('datasource')
export class RestUserDataSource extends juggler.DataSource implements LifeCycleObserver {
  static readonly dataSourceName = 'RestUserDataSource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.RestUserDataSource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
