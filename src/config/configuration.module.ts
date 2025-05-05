import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigModule } from '@nestjs/config';
import { envValidate } from './env.validations';
import { EnvironmentVariables } from './env.validations';

export interface ConfigModuleOptions {
  envFile: string | string[];
}

@Module({})
export class ConfigurationModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      global: true,
      module: ConfigurationModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigurationService,
        EnvironmentVariables,
      ],
      imports: [
        ConfigModule.forRoot({
          // validate: envValidate,
          // ignoreEnvFile: true,
          envFilePath: options.envFile,
        })
      ],
      exports: [ConfigurationService, EnvironmentVariables],
    };
  }
}
