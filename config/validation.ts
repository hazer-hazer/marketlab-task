import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export enum Env {
  Dev = 'dev',
  Prod = 'prod',
}

export class Config {
  @IsOptional()
  @IsEnum(Env)
  env?: Env;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(65535)
  port?: number;

  @IsOptional()
  @IsUrl({ require_tld: false })
  linkBaseUrl?: string;
}

export function validate(config: unknown): Config {
  const validatedConfig = plainToInstance(Config, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`${errors.toString()}Got: ${JSON.stringify(config)}`);
  }
  return validatedConfig;
}
