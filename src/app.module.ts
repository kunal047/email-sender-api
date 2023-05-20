import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailAccountModule } from './modules/email-account/email-account.module';
import { EmailModule } from './modules/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAccount } from './modules/email-account/entities/email-account.entity';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    EmailAccountModule,
    EmailModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type (e.g., mysql, postgresql, sqlite, etc.)
      host: process.env.POSTGRES_HOST, // Database host
      port: parseInt(process.env.POSTGRES_PORT, 10), // Database port
      username: process.env.POSTGRES_USER, // Database username
      password: process.env.POSTGRES_PASSWORD, // Database password
      database: process.env.POSTGRES_DB, // Database name
      entities: [EmailAccount], // Array of entity classes
      synchronize: true, // Automatically creates database tables (for development)
      logging: true, // Enable SQL query logging (for development)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
