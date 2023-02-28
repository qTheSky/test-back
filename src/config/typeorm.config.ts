import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getLocalTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: configService.get('PORT'),
    username: configService.get('DATABASEUSERNAME'),
    password: configService.get('PASSWORD'),
    database: configService.get('DATABASE'),
    autoLoadEntities: true,
    synchronize: true,
  };
};
// export const getCloudTypeOrmConfig = (
//     configService: ConfigService,
// ): TypeOrmModuleOptions => {
//     return {
//         type: 'postgres',
//         host: `ep-falling-frost-826786.eu-central-1.aws.neon.tech`,
//         port: configService.get('PPORT'),
//         username: configService.get('PDATABASEUSERNAME'),
//         password: configService.get('PPASSWORD'),
//         database: configService.get('PDATABASE'),
//         autoLoadEntities: true,
//         synchronize: true,
//         ssl: true,
//     };
// };
