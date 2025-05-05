
import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
// import { EnvConfig } from './interfaces';
import { ConfigModuleOptions } from './configuration.module';
import { EnvironmentVariables } from './env.validations';


@Injectable()
export class ConfigurationService {
  private _envConfig/* : EnvConfig */;

	private _envVariables: EnvironmentVariables;
  constructor(
    @Inject('CONFIG_OPTIONS')
    private readonly options?: ConfigModuleOptions,
  ) {
		const NODE_ENV = process.env.NODE_ENV || 'development';

		let filePath = NODE_ENV === 'development' ? '../' : '';
		for (let i = 0; i < options.envFile.length; i++) {
			const env = options.envFile[i];

			try {
				const envFile = path.resolve(__dirname, '../../', filePath, env);
				this._envConfig = dotenv.parse(fs.readFileSync(envFile));
				break;
			}
			catch (error) {
				continue;
			}
		}

		this._envVariables = new EnvironmentVariables(this._envConfig);
  }

  get(key: string): string {
    return this._envConfig[key];
  }

	public get envVariables(): EnvironmentVariables {
		return this._envVariables;
	}
}
