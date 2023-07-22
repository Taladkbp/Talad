import { registerRootComponent } from 'expo';
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '@env';

import App from './src/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

const YOUR_ACCESS_KEY_ID = {AWS_ACCESS_KEY_ID}
const YOUR_SECRET_ACCESS_KEY = {AWS_SECRET_ACCESS_KEY}

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: YOUR_ACCESS_KEY_ID,
    secretAccessKey: YOUR_SECRET_ACCESS_KEY,
  },
});

(async () => {
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
})();