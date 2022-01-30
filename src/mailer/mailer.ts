import axios from 'axios';
import { SendArgs } from '../types';

export class Mailer {
  uri: string;

  constructor(config: { uri: string }) {
    this.uri = config.uri;
  }

  async send(args: SendArgs) {
    try {
      if (!this.uri) {
        console.log('Mailer URI Required for Mailer Webhook.');
        return;
      }

      const resp = await axios.post(this.uri, args);

      return resp.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
