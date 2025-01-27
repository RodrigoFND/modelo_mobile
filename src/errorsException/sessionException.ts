// src/errors/authErrors.ts

export class TokenNotFoundError extends Error {
    constructor() {
      super("Refresh token não encontrado.");
      this.name = "TokenNotFoundError";
    }
  }
  
  export class SessionIdChangedError extends Error {
    constructor() {
      super("Session ID changed between requests.");
      this.name = "SessionIdChangedError";
    }
  }
  