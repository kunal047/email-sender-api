import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EmailAccountDto {
  @IsNotEmpty()
  @IsString()
  fromEmail: string;

  @IsNotEmpty()
  @IsString()
  smtpHost: string;

  @IsNotEmpty()
  @IsNumber()
  smtpPort: number;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  toEmail: string;

  @IsNotEmpty()
  @IsNumber()
  messagesPerDay: number;

  @IsNotEmpty()
  @IsNumber()
  minTimeGap: number;

  @IsNotEmpty()
  @IsString()
  imapHost: string;

  @IsNotEmpty()
  @IsNumber()
  imapPort: number;

  @IsString()
  imapUserName: string;

  @IsString()
  imapPassword: string;

  @IsString()
  replyToAddress: string;
}
