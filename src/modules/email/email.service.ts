import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendVerificationEmail(
    smtpHost: string,
    smtpPort: number,
    userName: string,
    password: string,
    toEmail: string,
    fromEmail: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: userName,
        pass: password,
      },
    });

    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: 'Email Verification',
      text: `This is a test email for your email account ${fromEmail}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }

  async send(
    smtpHost: string,
    smtpPort: number,
    userName: string,
    password: string,
    toEmail: string,
    fromEmail: string,
    subject: string,
    text: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      // Set up your email transporter configuration here
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: userName,
        pass: password,
      },
    });

    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: subject,
      text: text,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
