/* eslint-disable no-unused-vars */
const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    const extendedPayload = {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + Number(process.env.ACCESS_TOKEN_AGE),
    };
    return this._jwt.generate(extendedPayload, process.env.ACCESS_TOKEN_KEY);
  }

  async createRefreshToken(payload) {
    const extendedPayload = {
      ...payload,
      exp:
        Math.floor(Date.now() / 1000) + Number(process.env.REFRESH_TOKEN_AGE),
    };
    return this._jwt.generate(extendedPayload, process.env.REFRESH_TOKEN_KEY);
  }

  async verifyRefreshToken(token) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY);
      if (artifacts.decoded.payload.exp * 1000 < Date.now()) {
        throw new Error('Refresh token expired');
      }
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async decodePayload(token) {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
  }
}

module.exports = JwtTokenManager;
