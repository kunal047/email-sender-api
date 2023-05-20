import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { EmailAccount } from './entities/email-account.entity';
import { EmailService } from '../email/email.service';
import { EmailAccountDto } from './dto/email-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailAccountService {
  private readonly logger = new Logger(EmailAccountService.name);

  constructor(
    @InjectRepository(EmailAccount)
    private emailAccountRepository: Repository<EmailAccount>,
    private emailService: EmailService,
  ) {}

  async create(emailAccountData: EmailAccountDto): Promise<EmailAccountDto> {
    try {
      const count = await this.emailAccountRepository.count();
      const userId = count + 1;
      await this.emailAccountRepository.save({
        userId,
        ...emailAccountData,
      });
    } catch (error) {
      this.logger.error(`create: ${JSON.stringify(error.message)}`);
    }
    return emailAccountData;
  }

  async findAll(): Promise<EmailAccount[]> {
    return await this.emailAccountRepository.find();
  }

  async verify(emailAccountData: EmailAccountDto): Promise<EmailAccountDto> {
    try {
      await this.emailService.sendVerificationEmail(
        emailAccountData.smtpHost,
        emailAccountData.smtpPort,
        emailAccountData.userName,
        emailAccountData.password,
        emailAccountData.fromEmail,
        emailAccountData.fromEmail,
      );
      // save the data of host, port, username, password as a hash value for the user in redis
    } catch (error) {
      throw HttpException.createBody({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
    return emailAccountData;
  }

  async send(sendEmailData: SendEmailDto): Promise<SendEmailDto> {
    // get the latest email account data from db
    const emailAccount = await this.emailAccountRepository.findOne({
      order: { id: 'DESC' },
      where: {},
    });
    this.logger.log(`Latest email account: ${JSON.stringify(emailAccount)}`);
    if (!emailAccount) {
      throw HttpException.createBody({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No email account found',
      });
    }
    await this.emailService.send(
      emailAccount.smtpHost,
      emailAccount.smtpPort,
      emailAccount.userName,
      emailAccount.password,
      sendEmailData.toEmail,
      emailAccount.fromEmail,
      sendEmailData.subject,
      sendEmailData.text,
    );

    return sendEmailData;
  }
}
