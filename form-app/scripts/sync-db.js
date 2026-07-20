import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('Current directory:', process.cwd());
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const { sequelize } = await import('../models/index.js');

try {
  await sequelize.sync({ alter: true });
  console.log('All tables synced successfully.');
} catch (err) {
  console.error('Sync failed:', err);
} finally {
  await sequelize.close();
}