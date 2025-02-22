import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserSearchDto } from './users/dto/search-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { InternalDisabledLogger } from './app/app.logger';


async function bootstrap() {
	console.time('Booting');

	const APP_PORT = process.env.APP_PORT || 3333;

	const app = await NestFactory.create(AppModule, {
		logger: new InternalDisabledLogger
	});

	app.setGlobalPrefix('api');


	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		transformOptions: {
			enableImplicitConversion: false,
		}
	}));

	const config = new DocumentBuilder()
		.setTitle('Pratiquei Exame (REST API)')
		.setVersion('v0.1.0-alpha')
		// .setTitle('UVV-ADS-2024')
		.build();

	const document = SwaggerModule.createDocument(app, config,);
	SwaggerModule.setup('api/swagger', app, document, {
		customSiteTitle: 'Swagger UI | Pratiquei Exame (REST API)',
		jsonDocumentUrl: 'openapi.json',
		explorer: true,
		swaggerOptions: {
			docExpansion: "none"
		}
	});

	console.timeEnd('Booting');
	await app.listen(APP_PORT);
}

bootstrap();
