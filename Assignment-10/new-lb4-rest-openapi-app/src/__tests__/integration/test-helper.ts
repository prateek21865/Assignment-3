import {NewLb4RestOpenapiAppApplication} from '../..';  // Adjust path as per your project structure
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
  });

  const app = new NewLb4RestOpenapiAppApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: NewLb4RestOpenapiAppApplication;
  client: Client;
}
