import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: this, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync(databaseConfig),
    AuthModule,
    UserModule,
    TaskModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
