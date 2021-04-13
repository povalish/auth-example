import { makeAutoObservable } from 'mobx';
import { Request } from 'api/types/Request';

import { Tokens } from 'authorization/models/Tokens';
import { LoginRD } from 'authorization/models/LoginRD';
import { login } from 'authorization/requests/login';
import { refreshTokens } from 'authorization/requests/refreshTokens';

import { LocalStorage, Field } from 'utils/LocalStorage';



export class AuthorizationService {
  // Store user authorization
  private tokens: Tokens | null = null;

  constructor() {
    // Init MobX reactivity
    makeAutoObservable(this);
    // Try to get authorization from LocalStorage
    this.tokens = LocalStorage.get<Tokens>(Field.Tokens);
  }


  /**
   * Setting new tokens.
   *
   * @param tokens New tokens.
   */
  public setTokens(tokens: Tokens): void {
    this.tokens = tokens;
    LocalStorage.save<Tokens>(Field.Tokens, tokens);
  }


  /**
   * Getting current tokens.
   *
   * @returns Current tokens
   */
  public getTokens(): Tokens | null {
    return this.tokens;
  }


  /**
   * Get current authorization status.
   */
  get isAuthed(): boolean {
    return !!this.tokens;
  }


  /**
   * Clear user authorization.
   */
  public clear(): void {
    this.tokens = null;
    LocalStorage.remove(Field.Tokens);
  }


  /**
   * [Request]
   *
   * Authorize client and get authorization tokens.
   * Tokens will save in Application store and LocalStorage.
   *
   * @param data Email/password.
   * @returns Request model with Tokens.
   */
  public requestLogin(data: LoginRD): Promise<Request<Tokens>> {
    return login(data).then((response) => {
      if (response.status === 'loaded') {
        runInAction(() => this.setTokens(response.payload));
      }
      return response;
    });
  }



  public requestRefreshTokens(): Promise<Request<Tokens>> {
    if (!this.tokens?.refresh) {
      return new Promise((resolve, reject) => {
        resolve({ status: 'error', error: new Error('[AuthorizationService] Cannot refresh tokens. Refresh token is not found.') });
      });
    }

    return refreshTokens({ refresh: this.tokens.refresh }).then((response) => {
      if (response.status === 'loaded') {
        runInAction(() => this.setTokens(response.payload));
      }
      return response;
    });
  }


  /**
   * [Utility]
   *
   * Get direct access token.
   *
   * @returns Access token or null if user is not authorized.
   */
  public getAccessToken(): string | null {
    return this.tokens?.access || null;
  }


  /**
   * [Utility]
   *
   * Get direct refresh token.
   *
   *
   * @returns Refresh token or null if user is not authorized.
   */
  public getRefreshToken(): string | null {
    return this.tokens?.refresh || null;
  }



  /**
   * [Utility]
   *
   * Get Authorization header -- 'Bearer <token>'
   *
   * @returns String as 'Bearer <token>'.
   */
  public getAuthorizationHeader(): string | null {
    if (this.isAuthed) { return `Bearer ${this.tokens!.access}`; }
    return null;
  }
}


export const authorizationService = new AuthorizationService();
function runInAction(arg0: () => void) {
  throw new Error('Function not implemented.');
}

