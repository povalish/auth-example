import { AxiosError, AxiosRequestConfig } from 'axios';
import { authorizationService } from 'authorization/services/AuthorizationService';
import { RequestBaseConfig } from '../types/RequestBaseConfig';
import { AxiosAgent } from './AxiosAgent';



type AuthRequestConfig = AxiosRequestConfig & {
  retry?: boolean;
}


export class AxiosAuthAgent extends AxiosAgent {
  constructor(config: RequestBaseConfig) {
    super(config);

    // Use Auhtorization header for each request
    this.axiosInstance.interceptors.request.use((requestConfig) => {
      const newConfig = { ...requestConfig };

      if (authorizationService.isAuthed) {
        newConfig.headers.Authorization = authorizationService.getAuthorizationHeader()!;
      }

      return newConfig;
    });

    // Handle 401 error and refresh token
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const originalRequest: AuthRequestConfig = error.config;
        const refreshToken = authorizationService.getRefreshToken();

        if (error.response?.status === 401 && !originalRequest.retry && refreshToken) {
          originalRequest.retry = true;

          return authorizationService.requestRefreshTokens().then((response) => {
            if (response.status === 'loaded') {
              // eslint-disable-next-line max-len
              this.axiosInstance.defaults.headers.Authorization = authorizationService.getAccessToken();
            }

            return this.axiosInstance(originalRequest);
          });
        }

        return error;
      },
    );
  }
}
