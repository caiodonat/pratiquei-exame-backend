import { DynamicModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../database/database.module';
import { ExamsModule } from '../exams/exams.module';
import configuration from '../configOld/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerMiddleware } from './app.middleware';
import { CoursesModule } from 'src/courses/courses.module';
import { ConfigurationModule } from '@config/configuration.module';


interface AppModuleOptions {
  envFile: string[];
  databaseType: 'postgres' | 'sqlite';
  loggerLevel?: any[] //LogLevel2[];
}

@Module({})
export class AppModule implements NestModule {
  static register(options: AppModuleOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigurationModule.register({
          envFile: options.envFile,
        }),
        DatabaseModule.register({
          databaseType: options.databaseType,
          loggerLevel: options.loggerLevel
        }),
        // @TODO: export to frontend module
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '../..', 'frontend'),
          exclude: ['/api/*'],
          serveStaticOptions: {
            fallthrough: false,
          },
        }),
        UsersModule,
        // ExamsModule,
        // CoursesModule
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }

  // Configure the middleware
  // This method is called after all modules are loaded
  // and before the application starts listening for requests
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
