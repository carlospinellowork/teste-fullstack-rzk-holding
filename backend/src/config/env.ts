import 'dotenv/config';

export const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
  exchangeRateApi: process.env.EXCHANGE_RATE_API_KEY,
};
