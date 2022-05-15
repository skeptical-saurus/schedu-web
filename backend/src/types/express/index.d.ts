declare namespace Express {
  export interface Request {
    user?: DecodedIdToken
  }
}
