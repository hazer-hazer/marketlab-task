import { ConfigModule } from '@nestjs/config';
import dev from './dev';
import prod from './prod';
import { Config, validate } from './validation';

export const config = (): Config => {
  const partial = {
    ...(process.env.NODE_ENV === 'prod' ? prod : dev)(),
  };

  // if (partial.baseUrl) {
  //   partial.linkBaseUrl ??= `${partial.baseUrl}${partial.port ? `:${partial.port}` : ''}`;
  // }

  return partial;
};

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [
    // Note: This wrapper is meant to be used as `validate` directly, but Nest/config module fails to validate non-env-var configs :(
    () => {
      const cfg = config();
      return validate(cfg);
    },
  ],
});
