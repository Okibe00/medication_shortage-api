import { Module } from '@nestjs/common';
import { ShortageService } from './shortage.service';
import { ShortageController } from './shortage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shortage, ShortageSchema } from './entities/shortage.entity';
import { DrugsModule } from 'src/drugs/drugs.module';
import { Drug, DrugSchema } from 'src/drugs/entities/drug.entity';

@Module({
  imports: [
    DrugsModule,
    MongooseModule.forFeature([
      { name: Drug.name, schema: DrugSchema },
      { name: Shortage.name, schema: ShortageSchema },
    ]),
  ],
  controllers: [ShortageController],
  providers: [ShortageService],
})
export class ShortageModule {}
