import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: +configService.get<number>('DB_PORT') || 5432,
    username: configService.get('DB_USERNAME') || 'postgres',
    password: configService.get('DB_PASSWORD') || 'password',
    // database: configService.get('DB_NAME') || 'dictionary',
    autoLoadEntities: true,
    synchronize: true,
  };
}
