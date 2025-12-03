const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const pool = require('../../database/postgres/pool');
const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres');

describe('AuthenticationRepository postgres', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addToken function', () => {
    it('should add token to database', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(
        pool
      );
      const token = 'token';

      // Action
      await authenticationRepository.addToken(token);

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(1);
      expect(tokens[0].token).toBe(token);
    });
  });

  describe('checkAvailabilityToken function', () => {
    it('should throw InvariantError if token not available', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(
        pool
      );
      const token = 'token';

      // Action & Assert
      await expect(
        authenticationRepository.checkAvailabilityToken(token)
      ).rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError if token available', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(
        pool
      );
      const token = 'token';
      await AuthenticationsTableTestHelper.addToken(token);

      // Action & Assert
      await expect(
        authenticationRepository.checkAvailabilityToken(token)
      ).resolves.not.toThrow(InvariantError);
    });
  });

  describe('deleteToken', () => {
    it('should delete token from database', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(
        pool
      );
      const token = 'token';
      await AuthenticationsTableTestHelper.addToken(token);

      // Action
      await authenticationRepository.deleteToken(token);

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(0);
    });
  });

  describe('deleteExpiredTokens', () => {
    it('should delete only tokens that are expired', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(
        pool
      );

      const expiredToken = 'expired-token';
      const validToken = 'valid-token';

      // Tambah token expired → expires_at kemarin
      await AuthenticationsTableTestHelper.addToken(
        expiredToken,
        new Date(Date.now() - 24 * 60 * 60 * 1000) // expired
      );

      // Tambah token valid → expires_at besok
      await AuthenticationsTableTestHelper.addToken(
        validToken,
        new Date(Date.now() + 24 * 60 * 60 * 1000) // valid
      );

      // Action
      await authenticationRepository.deleteExpiredTokens();

      // Assert
      const expiredTokens = await AuthenticationsTableTestHelper.findToken(
        expiredToken
      );
      const validTokens = await AuthenticationsTableTestHelper.findToken(
        validToken
      );

      expect(expiredTokens).toHaveLength(0); // HARUS TERHAPUS
      expect(validTokens).toHaveLength(1); // HARUS TETAP ADA
    });
  });
});
