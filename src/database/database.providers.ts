import { DataSource } from 'typeorm';

export const databaseProviders = [
	{
		provide: 'DATA_SOURCE',
		useFactory: async () => {
			const dataSource = new DataSource({
				type: 'sqlite',
				database: process.env.DATABASE_HOST || 'dev.db',
				entities: [
					__dirname + '/../**/*.entity{.ts,.js}',
				],
				synchronize: true,
				logging: ['migration', 'query']
			});

			return dataSource.initialize();
		},
	},
];
