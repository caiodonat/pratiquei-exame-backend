import { IsArray, IsEmail, IsEnum, IsHash, IsIn, IsNumber, IsOptional, IsString, IsUrl, Matches, validateSync } from 'class-validator';
import { plainToInstance, Transform } from 'class-transformer';
import { createHash } from 'node:crypto';
// 
import type { LogLevel2 } from '@database/typeorm.logger';

export enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

/**
 * @todo
 * - leitura direto do ambiente, caso `.env` informado/encontrado.
 */
export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @IsIn([3000, 5000, 21243], { message: `$property deve ser [3000, 5000, 21243] | $value` })
  @Transform(({ value }) => parseInt(value))
  APP_PORT: number = 21243;

  // @Matches(/^(?!.*\/$).*/, { message: 'Não usar ultima barra' })
  // APP_BASENAME: string = '';

  @IsUrl({ require_tld: false }, { message: 'URL inválida' })
  APP_FRONTEND_URL: string = 'http://localhost:3333';

  @IsString()
  APP_COOKIE_EXPIRES: string = '60m';

  @IsString()
  APP_COOKIE_KEY: string = 'authtoken';

  @IsHash('sha256')
  APP_JWT_SHA256: string = createHash('sha256').update('pratiquei-exame').digest('hex');

  @IsString()
  APP_UPLOAD_PATH: string = './upload';

  @IsIn(['postgres', 'sqlite'], { message: `$property deve ser [postgres, sqlite] | $value` })
  DATABASE_TYPE: string;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  @IsIn([5432, 3306], { message: `$property deve ser [5432, 3306] | $value` })
  @Transform(({ value }) => parseInt(value))
  DATABASE_PORT: number;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASS: string;

  @IsArray()
  private _DATABASE_LOGGER: /* LogLevel2 */any[] = [];

  @IsString()
  @IsOptional()
  MAIL_SERVICE: string | undefined;

  @IsString()
  @IsOptional()
  MAIL_HOST: string | undefined;

  @IsString()
  @IsEmail()
  @IsOptional()
  MAIL_USER: string | undefined;

  @IsString()
  @IsOptional()
  MAIL_PASS: string | undefined;

  constructor(config: Record<string, unknown> | EnvironmentVariables) {
    Object.assign(this, config);
  }

  public get DATABASE_LOGGER(): LogLevel2[] {
    return this._DATABASE_LOGGER;
  }
  public set DATABASE_LOGGER(value: LogLevel2[] | string) {
    if (typeof value === 'string')
      this._DATABASE_LOGGER = value.split(',').map(e => e.trim() as LogLevel2);
    else
      this._DATABASE_LOGGER = value;
  }
}

export function envValidate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`\n${errors.map(e => `${e.property}: [ ${Object.values(e.constraints).join(', ')} ]`).join('\n')}`);
  }
  return validatedConfig;
}
