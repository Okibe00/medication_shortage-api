import { Test, TestingModule } from '@nestjs/testing';
import { ShortageService } from './shortage.service';

describe('ShortageService', () => {
  let service: ShortageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortageService],
    }).compile();

    service = module.get<ShortageService>(ShortageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
