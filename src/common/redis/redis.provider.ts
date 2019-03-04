import { Logger } from '@nestjs/common';
import { promisifyAll } from "bluebird";
import { createClient, Multi, RedisClient } from "redis";

const logger = new Logger('RedisProvider');
promisifyAll(RedisClient.prototype);
promisifyAll(Multi.prototype);

 export const RedisProvider = {
    provide: 'RedisProvider',
    useFactory: async (config) => {
      const redisClient = await createClient({
        host: config.redis.host,
        port: config.redis.port,
        auth_pass: config.redis.password
      });
      redisClient.on('ready', () => logger.log('Connected'));
      redisClient.on('error', e => logger.error(e.message, e.stack));
      //redisClient.flushall()
      return redisClient;
    },
    inject:['ConfigService']
  };