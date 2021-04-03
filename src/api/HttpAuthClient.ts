import { HttpBaseClient } from './HttpBaseClient';
import { RequestBaseConfig } from './types/RequestBaseConfig';
import { AxiosAuthAgent } from './HttpAgent/AxiosAuthAgent';


export class HttpAuthClient extends HttpBaseClient {
  constructor(config: RequestBaseConfig) {
    super(config, new AxiosAuthAgent(config));
  }
}


export default new HttpAuthClient({
  baseURL: '',
  defaultHeaders: { 'Content-Type': 'application/json' },
});
