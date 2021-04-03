import httpClient from 'api/HttpClient';
import { Tokens } from 'authorization/models/Tokens';
import { RefreshRD } from 'authorization/models/RefreshRD';


export const refreshTokens = (data: RefreshRD) => httpClient.reset()
  .setURL('/token-refresh')
  .setMethod('POST')
  .setData<RefreshRD>(data)
  .makeRequest<RefreshRD, Tokens>();
