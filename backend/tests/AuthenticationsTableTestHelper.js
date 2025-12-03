/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AuthenticationsTableTestHelper = {
  async addToken(token, expiresAt = new Date()) {
    const query = {
      text: 'INSERT INTO authentications(token, expires_at) VALUES($1, $2)',
      values: [token, expiresAt],
    };

    await pool.query(query);
  },

  async findToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await pool.query(query);

    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM authentications WHERE 1=1');
  },
};

module.exports = AuthenticationsTableTestHelper;
