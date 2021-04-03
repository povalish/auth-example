import httpClient from 'api/HttpAuthClient';


export const fetchProfile = () => httpClient.reset()
  .setURL('/profile')
  .setMethod('GET')
  .makeRequest<{}, {}>();
