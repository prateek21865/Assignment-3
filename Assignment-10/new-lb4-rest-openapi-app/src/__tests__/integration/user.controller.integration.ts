import {Client, expect} from '@loopback/testlab';
import {NewLb4RestOpenapiAppApplication} from '../..';  // Adjust path as per your project structure
import {setupApplication} from './test-helper';        // Import the helper function

describe('UserController Integration Tests', () => {
  let app: NewLb4RestOpenapiAppApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());  // Set up app and client for testing
  });

  after(async () => {
    await app.stop();  // Stop the application after tests
  });

  it('creates a new user', async () => {
    const newUser = {
      name: 'Prateek',
      email: 'prateek.singh@sourcefuse.com',
      password: 'pass1234'
    };

    const response = await client
      .post('/users')
      .send(newUser)
      .expect(200);

    expect(response.body).to.containDeep(newUser);
    expect(response.body).to.have.property('id');
  });

  it('retrieves all users', async () => {
    const response = await client
      .get('/users')
      .expect(200);

    expect(response.body).to.be.Array();
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('retrieves a user by ID', async () => {
    const newUser = {
      name: 'Prateek singh',
      email: 'prateek.singh1@sourcefuse.com',
      password: 'pass5678'
    };

    // First create a user to fetch
    const createRes = await client
      .post('/users')
      .send(newUser)
      .expect(200);

    const userId = createRes.body.id;

    // Now retrieve the user by ID
    const response = await client
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body).to.containDeep(newUser);
    expect(response.body).to.have.property('id', userId);
  });

  it('updates a user by ID', async () => {
    const newUser = {
      name: 'Prateek singh',
      email: 'prateek.singh1@sourcefuse.com',
      password: 'pass5678'
    };

    // Create a user to update
    const createRes = await client
      .post('/users')
      .send(newUser)
      .expect(200);

    const userId = createRes.body.id;

    const updatedUser = {
      name: 'Prateek Pratap Singh',
      email: 'prateek.pratap@sourcefuse.com'
    };

    // Update the user
    await client
      .patch(`/users/${userId}`)
      .send(updatedUser)
      .expect(204); // 204 No Content on successful update

    // Verify the user is updated
    const response = await client
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body).to.containDeep(updatedUser);
  });

  it('deletes a user by ID', async () => {
    const newUser = {
      name: 'Prateek singh',
      email: 'prateek.singh1@sourcefuse.com',
      password: 'pass1234'
    };

    // First create a user to delete
    const createRes = await client
      .post('/users')
      .send(newUser)
      .expect(200);

    const userId = createRes.body.id;

    // Now delete the user
    await client
      .delete(`/users/${userId}`)
      .expect(204); // 204 No Content on successful deletion

    // Verify the user is deleted
    await client
      .get(`/users/${userId}`)
      .expect(404); // User should no longer exist
  });
});
