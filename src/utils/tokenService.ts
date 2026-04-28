//Token service class exports the functions to set and get the access token
class TokenService {
  private accessToken: string | null = null;

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  clear() {
    this.accessToken = null;
  }
}

export const tokenService = new TokenService();
//exporting the object tokenService
