import { Module, Global } from '@nestjs/common';

import { ConfigService} from './config/config.service';
import { RedisProvider } from './redis/redis.provider';

@Global()
@Module({
  providers: [
    ConfigService,
    RedisProvider,
  ],
  exports: [
    ConfigService,
    RedisProvider,
  ]
})
export class CommonModule {}