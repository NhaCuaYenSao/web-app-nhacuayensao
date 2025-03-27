const PERSIST_ROOT = "persist:root";

export const localStoreTokenService = {
  getAccessToken() {
    const auth = localStorage.getItem(PERSIST_ROOT);
    if (auth) {
      const authParsed = JSON.parse(auth);
      const authData = JSON.parse(authParsed.auth);
      return authData.token.accessToken;
    }
  },

  getRefreshToken() {
    const auth = localStorage.getItem(PERSIST_ROOT);
    if (auth) {
      const authParsed = JSON.parse(auth);
      const authData = JSON.parse(authParsed.auth);
      return authData.token.refreshToken;
    }
  },

  setAccessToken(accessToken) {
    const auth = localStorage.getItem(PERSIST_ROOT);
    if (auth) {
      const authParsed = JSON.parse(auth);
      const authData = JSON.parse(authParsed.auth);
      authData.token.accessToken = accessToken;
      authParsed.auth = JSON.stringify(authData);
      const savedData = JSON.stringify(authParsed);
      localStorage.setItem(PERSIST_ROOT, savedData);
    }
  },

  setRefreshToken(refreshToken) {
    const auth = localStorage.getItem(PERSIST_ROOT);
    if (auth) {
      const authParsed = JSON.parse(auth);
      const authData = JSON.parse(authParsed.auth);
      authData.token.refreshToken = refreshToken;
      authParsed.auth = JSON.stringify(authData);
      localStorage.setItem(PERSIST_ROOT, JSON.stringify(authParsed));
    }
  },
};
