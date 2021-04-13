import { RequestConfig } from '../types/RequestConfig';
import { RequestBaseConfig } from '../types/RequestBaseConfig';
import { Request } from '../types/Request';


export interface IAgent {
  initRequest: <RequestType, ResponseType>(
    config: RequestConfig<RequestType>
  ) => Promise<Request<ResponseType>>;
}
