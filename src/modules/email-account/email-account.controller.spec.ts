import { Test, TestingModule } from '@nestjs/testing';
import { EmailAccountController } from './email-account.controller';

describe('EmailAccountController', () => {
  let controller: EmailAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailAccountController],
    }).compile();

    controller = module.get<EmailAccountController>(EmailAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
