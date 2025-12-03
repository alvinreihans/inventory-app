const cron = require('node-cron');

module.exports = (authRepo) => {
  cron.schedule('0 * * * *', async () => {
    console.log('🔄 Menjalankan cron cleanup refresh token expired...');

    await authRepo.deleteExpiredTokens();
  });
};
