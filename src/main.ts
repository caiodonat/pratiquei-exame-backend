import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SearchUserDto } from './users/dto/search-user.dto';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const APP_PORT = process.env.APP_PORT || 3333;

  const app = await NestFactory.create(AppModule);


	app.useGlobalPipes(new ValidationPipe({
		transform: true,
	}));

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    // extraModels: [SearchUserDto]
  });
  SwaggerModule.setup('swagger', app, document);
  


  await app.listen(APP_PORT);
}
bootstrap();
