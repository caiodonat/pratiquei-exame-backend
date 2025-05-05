import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// 
import { psqlConfig, sqliteDev } from './typeorm.config';
import { type LogLevel2, MyTypeORMLogger } from './typeorm.logger';

type DatabaseOptions = {
  databaseType?: 'postgres' | 'sqlite';
  loggerLevel?: LogLevel2[]
}

@Module({})
export class DatabaseModule {
  static register(options: DatabaseOptions): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATA_SOURCE',
          useFactory: () => new DataSource(options.databaseType === 'postgres' ? psqlConfig : sqliteDev).initialize(),
        },
      ],
      imports: [
        TypeOrmModule
          .forRoot({
            autoLoadEntities: true,
            ...(options.databaseType === 'postgres' ? psqlConfig : sqliteDev),
            logger: options.loggerLevel ? new MyTypeORMLogger(options.loggerLevel) : undefined,
          })
      ],
      exports: ['DATA_SOURCE'],
    };
  }
}
