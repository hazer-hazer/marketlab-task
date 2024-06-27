import { Config, Env } from './validation';

export default (): Partial<Config> => ({
  env: Env.Dev,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
});
