import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SearchUserDto } from './users/dto/search-user.dto';
import { ValidationPipe } from '@nestjs/common';


declare const module: any;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);

//   if (module.hot) {
//     module.hot.accept();
//     module.hot.dispose(() => app.close());
//   }
// }
// bootstrap();


async function bootstrap() {

  const APP_PORT = process.env.APP_PORT || 3333;

  const app = await NestFactory.create(AppModule,{
    logger:[
      'error', 'debug', 'fatal', 'warn'
    ]
  });


	app.useGlobalPipes(new ValidationPipe({
		transform: true,
	}));

  const config = new DocumentBuilder()
    .setTitle('Pratiquei Exame ADS')
    .setVersion('1.0.0-alpha')
    // .setTitle('UVV-ADS-2024')
    .build();
    
  const document = SwaggerModule.createDocument(app, config,);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'UVV-ADS-2024 (api)'
  });

  await app.listen(APP_PORT);

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
