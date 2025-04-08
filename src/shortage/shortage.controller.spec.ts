import { Test, TestingModule } from '@nestjs/testing';
import { ShortageController } from './shortage.controller';
import { ShortageService } from './shortage.service';

describe('ShortageController', () => {
  let controller: ShortageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortageController],
      providers: [ShortageService],
    }).compile();

    controller = module.get<ShortageController>(ShortageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
