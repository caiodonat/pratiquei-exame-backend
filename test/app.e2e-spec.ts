import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import request from 'supertest';
// 
import { AppModule } from '@app/app.module';
// import { baseConfig, sqliteTestE2e } from '@database/typeorm.config';
// import { MyTypeORMLogger } from '@database/typeorm.logger';
// import { seed } from '@database/seed';
// import { ConfigurationModule } from '@config/configuration.module';
import { DatabaseModule } from '@database/database.module';


describe('Aplicação', () => {
	let app: INestApplication;
	let dataSource: DataSource;

	beforeAll(async () => {
		const moduleSlim: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule.register({
					databaseType: 'sqlite',
					envFile: ['.env.test', '.env']
				}),
			]
		})
			// .overrideProvider('DATA_SOURCE')
			// .useValue(new DataSource(sqliteTestE2e()))
			.compile();

		app = await moduleSlim
			.createNestApplication()
			.init();

		dataSource = moduleSlim.get<DataSource>('DATA_SOURCE');
		if (!dataSource.isInitialized) {
			await dataSource.initialize();
			await dataSource.synchronize(true);
		}
		// await seed(dataSource, false, false);
	});
	afterAll(async () => {
		if (dataSource?.isInitialized) {
			// await dataSource.dropDatabase();
			await dataSource.destroy();
		}
		await app?.close();
	});

	describe(`Status da Aplicação`, () => {
		test(`Saúde da aplicação deve estar disponível`, () => {
			return request(app.getHttpServer())
				.get('/health')
				.expect(204);
		});
		test(`Saúde detalhada da aplicação deve estar disponível`, () => {
			return request(app.getHttpServer())
				.get('/health/full')
				.then(res => {
					expect(res.status).toBe(200);
					expect(res.body).toHaveProperty('application');
					expect(res.body).toHaveProperty('database');
					expect(res.body.application).toBe(true);
					expect(res.body.database).toBe(true);
				});
		});
	});

	describe(`Swagger`, () => {
		test(`raiz deve redirecionar para swagger`, () => {
			return request(app.getHttpServer())
				.get('/')
				.expect(302)
				.expect(res => {
					expect(res.headers.location).toBe('/swagger');
				});
		});
		test.skip(`swagger deve estar disponível`, () => {
			return request(app.getHttpServer())
				.get('/swagger')
				.expect(200);
		});
		test.skip(`openapi deve estar disponível`, () => {
			return request(app.getHttpServer())
				.get('/openapi.json')
				.expect(200);
		});
	});

	/**
	 * @todo adicionar testes para todas as variáveis de ambiente
	 */
	describe.skip(`Variáveis de Ambiente`, () => {
		test(`APP_COOKIE_EXPIRES deve ser válido`, () => {
			const APP_COOKIE_EXPIRES = process.env.APP_COOKIE_EXPIRES;
			expect(APP_COOKIE_EXPIRES).toBeDefined();
			expect(APP_COOKIE_EXPIRES).toMatch(/^\d+m$/);
		});
	});
});
