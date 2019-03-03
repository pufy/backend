import { parse } from 'dotenv';
import * as Joi from 'joi';
import { existsSync, readFileSync } from 'fs';
import { Logger } from '@nestjs/common';

interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly filePath = `.env`;
  private logger = new Logger(`ConfigService`, true)

  constructor() {
    if (!existsSync(this.filePath)) {
      this.logger.error(`Config file ${this.filePath} not exist`)
      throw new Error();
    }
    const config = parse(readFileSync(this.filePath, 'utf-8'));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string(),
      APP_PORT: Joi.number().default(3000),
      APP_HOST: Joi.string(),
      APP_URL_PREFIX: Joi.string(),
      HOST_SITE: Joi.string(),
      JWT_KEY: Joi.string(),
      DB_TYPE: Joi.string(),
      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().default(5432),
      DB_USERNAME: Joi.string(),
      DB_PASSWORD: Joi.string(),
      DB_DATABASE: Joi.string(),
      DB_SCHEMA: Joi.string(),

      SECRET_KEY: Joi.string(),
      SG_APIKEY: Joi.string(),
      MAILER_SENDER: Joi.string(),

      SPOTIFY_CLIENT_ID: Joi.string(),
      SPOTIFY_CLIENT_SECRET: Joi.string(),
      SPOTIFY_CALLBACK_URL: Joi.string(),

      REDIS_HOST: Joi.string().default('localhost'),
      REDIS_PORT: Joi.number().default(6379),
      REDIS_PASSWORD: Joi.string()
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      this.logger.error(`Config validation error: ${error.message}`)
      throw new Error();
    }
    return validatedEnvConfig;
  }

  get environment(): string {
    return process.env.NODE_ENV || 'development'
  }

  get app_port(): number {
    return parseInt(this.envConfig.APP_PORT);
  }

  get orm_config(): any {
    return {
      type: this.envConfig.DB_TYPE,
      host: this.envConfig.DB_HOST,
      port: this.envConfig.DB_PORT,
      username: this.envConfig.DB_USERNAME,
      password: this.envConfig.DB_PASSWORD,
      database: this.envConfig.DB_DATABASE,
      entities: ["src/entities/*.ts"],
      synchronize: false
    }
  }

  get spotify(): any {
    return {
      client_id: this.envConfig.SPOTIFY_CLIENT_ID,
      client_secret: this.envConfig.SPOTIFY_CLIENT_SECRET,
      callback_url: this.envConfig.SPOTIFY_CALLBACK_URL
    }
  }

  get redis(): any {
    return {
      host: this.envConfig.REDIS_HOST,
      port: parseInt(this.envConfig.REDIS_PORT),
      password: this.envConfig.REDIS_PASSWORD
    }
  }

}