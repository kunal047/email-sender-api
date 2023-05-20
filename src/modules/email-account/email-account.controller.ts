import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { APIResponseType } from '../../common/types';
import { EmailAccountDto } from './dto/email-account.dto';
import { EmailAccountService } from './email-account.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email-account')
export class EmailAccountController {
  private readonly logger = new Logger(EmailAccountController.name);

  constructor(private readonly emailAccountService: EmailAccountService) {}

  @Post()
  async create(
    @Body() emailAccountData: EmailAccountDto,
  ): Promise<APIResponseType> {
    this.logger.log(`create: ${JSON.stringify(emailAccountData)}`);
    await this.emailAccountService.verify(emailAccountData);
    const emailAccount = this.emailAccountService.create(emailAccountData);
    return {
      statusCode: 200,
      message: 'Email account created successfully',
      data: emailAccount,
    };
  }

  @Get()
  async findAll(): Promise<APIResponseType> {
    const emailAccounts = await this.emailAccountService.findAll();
    return {
      statusCode: 200,
      message: 'Email accounts retrieved successfully',
      data: emailAccounts,
    };
  }

  @Post('verify')
  async verify(
    @Body() emailAccountData: EmailAccountDto,
  ): Promise<APIResponseType> {
    const emailAccount = this.emailAccountService.verify(emailAccountData);
    return {
      statusCode: 200,
      message: 'Email account verified successfully',
      data: emailAccount,
    };
  }

  @Post('mail')
  async sendEmail(
    @Body() sendEmailData: SendEmailDto,
  ): Promise<APIResponseType> {
    await this.emailAccountService.send(sendEmailData);
    return {
      statusCode: 200,
      message: 'Email sent successfully',
      data: sendEmailData,
    };
  }
}
