import 'dotenv/config';

export const config = {
  PORT: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
};
