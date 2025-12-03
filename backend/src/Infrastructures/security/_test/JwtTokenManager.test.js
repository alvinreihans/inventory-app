const Jwt = require('@hapi/jwt');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const JwtTokenManager = require('../JwtTokenManager');

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'dicoding',
      };
      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // Action
      const accessToken = await jwtTokenManager.createAccessToken(payload);

      // Assert
      expect(mockJwtToken.generate).toBeCalledWith(
        {
          ...payload,
          exp:
            Math.floor(Date.now() / 1000) +
            Number(process.env.ACCESS_TOKEN_AGE),
        },
        process.env.ACCESS_TOKEN_KEY
      );
      expect(accessToken).toEqual('mock_token');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'dicoding',
      };
      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // Action
      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      // Assert
      expect(mockJwtToken.generate).toBeCalledWith(
        {
          ...payload,
          exp:
            Math.floor(Date.now() / 1000) +
            Number(process.env.REFRESH_TOKEN_AGE),
        },
        process.env.REFRESH_TOKEN_KEY
      );
      expect(refreshToken).toEqual('mock_token');
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when verification failed', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({
        username: 'dicoding',
      });

      // Action & Assert
      await expect(
        jwtTokenManager.verifyRefreshToken(accessToken)
      ).rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError when refresh token verified', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const refreshToken = await jwtTokenManager.createRefreshToken({
        username: 'dicoding',
      });

      // Action & Assert
      await expect(
        jwtTokenManager.verifyRefreshToken(refreshToken)
      ).resolves.not.toThrow(InvariantError);
    });

    it('should throw InvariantError when refresh token is expired', async () => {
      // Arrange
      const mockJwt = {
        decode: jest.fn().mockReturnValue({
          decoded: {
            payload: {
              username: 'dicoding',
              exp: Math.floor(Date.now() / 1000) - 10, // expired 10 detik lalu
            },
          },
        }),
        verify: jest.fn(), // verify lolos, tapi exp manual yang fail
      };

      const jwtTokenManager = new JwtTokenManager(mockJwt);

      const expiredToken = 'expired_token';

      // Action & Assert
      await expect(
        jwtTokenManager.verifyRefreshToken(expiredToken)
      ).rejects.toThrow(InvariantError);

      expect(mockJwt.decode).toBeCalledWith(expiredToken);
      expect(mockJwt.verify).toBeCalled();
    });
  });

  describe('decodePayload function', () => {
    it('should decode payload correctly', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({
        username: 'dicoding',
      });

      // Action
      const { username: expectedUsername } =
        await jwtTokenManager.decodePayload(accessToken);

      // Action & Assert
      expect(expectedUsername).toEqual('dicoding');
    });
  });
});
