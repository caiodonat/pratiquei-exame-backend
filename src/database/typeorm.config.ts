import { DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
// 
import { MyTypeORMLogger } from "./typeorm.logger";
import { EnvironmentVariables } from "@config/env.validations";

dotenv.config();

const env = new EnvironmentVariables(dotenv.config().parsed);

export const baseConfig = {
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
    __dirname + '/../**/*.schema{.ts,.js}',
  ],
  migrations: [
    __dirname + '/../**/migrations/*{.ts,.js}',
  ]
}

export const psqlConfig: DataSourceOptions = ({
  type: 'postgres',
  username: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  synchronize: false,
  ...baseConfig
});

/// Data Source Option Presets

export const sqliteDev: DataSourceOptions = {
  type: 'sqlite',
  database: 'sqlite.db',
  synchronize: true,
  ...baseConfig,
};

export function sqliteTestE2e(debug?: boolean): DataSourceOptions {
  let loggerLevel: {
    logger: MyTypeORMLogger | undefined
  } | {} = {};
  const database = (
    !debug
      ? ':memory:'
      : `${new Date().toISOString()}.debug.sqlite.db`
  );
  // if (debug) {
  //   loggerLevel = {
  //     logger: new MyTypeORMLogger(['migration', 'query', 'error', 'warn'])
  //   };
  // }

  return {
    type: 'sqlite',
    database,
    synchronize: true,
    ...loggerLevel,
    ...baseConfig,
  };
}
