// import env from "../config/configuration";
// import { DataSourceOptions } from "typeorm";
// import * as dotenv from 'dotenv';

// /// Atualiza Variáveis de ambiente.
// dotenv.config();

// export const sqliteDataSource: DataSourceOptions = {
// 	type: 'sqlite',
// 	database: env().database.host,
// 	entities: [
// 		__dirname + '/../**/*.entity{.ts,.js}',
// 	],
// 	migrations: [
// 		__dirname + '/../**/migrations/*{.ts,.js}',
// 	],
// 	synchronize: false,
// };

// export const psqlDataSource: DataSourceOptions = {
// 	type: 'postgres',
// 	username: env().database.user,
// 	password: env().database.pass,
// 	host: env().database.host,
// 	database: env().database.name,
// 	entities: [
// 		__dirname + '/../**/*.entity{.ts,.js}',
// 	],
// 	// synchronize: true,
// 	migrations: [
// 		__dirname + '/../**/migrations/*{.ts,.js}',
// 	],
// 	logging: 'all'
// };