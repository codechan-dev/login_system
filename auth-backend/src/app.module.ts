// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // your MySQL host
      port: 3306,        // default MySQL port
      username: 'root',  // your MySQL username
      password: '', // your MySQL password
      database: 'auth_db',  // your MySQL database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
