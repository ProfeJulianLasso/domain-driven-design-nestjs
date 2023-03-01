import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { SecurityModule } from './common/contexts/security/infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
      isGlobal: true,
    }),
    SecurityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
