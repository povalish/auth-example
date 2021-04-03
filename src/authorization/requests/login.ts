import { LoginRD } from 'authorization/models/LoginRD';
import httpClient from 'api/HttpClient';
import { Tokens } from 'authorization/models/Tokens';


export const login = (data: LoginRD) => httpClient.reset()
  .setURL('/auth/')
  .setMethod('POST')
  .setData<LoginRD>(data)
  .makeRequest<LoginRD, Tokens>();
