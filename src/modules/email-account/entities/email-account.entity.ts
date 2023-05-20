import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class EmailAccount {
  @PrimaryGeneratedColumn() id: number;
  @Column() userId: number;
  @Column() fromName: string;
  @Column() fromEmail: string;
  @Column() userName: string;
  @Column() password: string;
  @Column() smtpHost: string;
  @Column() smtpPort: number;
  @Column() messagesPerDay: number;
  @Column() minimumTimeGap: number;
  @Column() imapHost: string;
  @Column() imapPort: number;
  @Column({ nullable: true }) imapUserName: string;
  @Column({ nullable: true }) imapPassword: string;
  @Column({ nullable: true }) replyToAddress: string;
}
