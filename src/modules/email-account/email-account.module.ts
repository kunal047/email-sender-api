// email-account.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { EmailAccountController } from './email-account.controller';
import { EmailAccountService } from './email-account.service';
import { EmailAccount } from './entities/email-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAccount]), EmailModule],
  providers: [EmailAccountService],
  controllers: [EmailAccountController],
})
export class EmailAccountModule {}
