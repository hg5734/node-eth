
export const errorManager = {
  NOT_FOUND: {
    type: 'NOT_FOUND',
    message: 'resource not found',
    code: 404
  },
  TOKEN_EXPIRED: {
    type: 'TOKEN_EXPIRED',
    message: 'token expired',
    code: 400
  },
  TOKEN_UNAUTHORIZED: {
    type: 'TOKEN_UNAUTHORIZED',
    message: 'unauthorized token',
    code: 500
  },
  NO_TOKEN: {
    type: 'NO_TOKEN',
    message: 'no token provided with the request',
    code: 400
  },
  ACCESS_DENIED: {
    type: 'ACCESS_DENIED',
    message: 'access has been denied',
    code: 400
  },
  VALIDATION_ERROR: {
    type: 'VALIDATION_ERROR',
    message: 'validation error',
    code: 400,
  },
  USER_ALREADY_EXIST: {
    type: 'USER_ALREADY_EXIST',
    message: 'Email id is already exist',
    code: 400,
  },
  ASSET_ALREADY_EXIST: {
    type: 'ASSET_ALREADY_EXIST',
    message: 'Asset is already exist',
    code: 400,
  },
  INVALID_LOGIN_ID: {
    type: 'INVALID_LOGIN_ID',
    message: 'Invalid login id',
    code: 400,
  },
  INVALID_PASSWORD: {
    type: 'INVALID_PASSWORD',
    message: 'password is incorrect',
    code: 400,
  }
};

export default {
  errorManager
};
