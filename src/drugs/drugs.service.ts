import { Injectable } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Drug } from './entities/drug.entity';
import { Model } from 'mongoose';

@Injectable()
export class DrugsService {
  constructor(@InjectModel(Drug.name) private drugModel: Model<Drug>) {}
  async create(createDrugDto: CreateDrugDto): Promise<Drug> {
    const newDrug = new this.drugModel(createDrugDto);
    return newDrug.save();
  }

  findAll() {
    return this.drugModel.find({}).exec();
  }

  findOne(id: string) {
    return this.drugModel.findById(id);
  }

  update(id: string, updateDrugDto: UpdateDrugDto) {
    // if (updateDrugDto.alternatives) {
    //   const { alternatives, ...others } = updateDrugDto;
    //   return this.drugModel.findByIdAndUpdate(
    //     id,
    //     {
    //       $set: others,
    //       $addToSet: { $each: alternatives },
    //     },
    //     { new: true },
    //   );
    // }
    return this.drugModel.findByIdAndUpdate(id, updateDrugDto, { new: true });
  }

  remove(id: string) {
    return this.drugModel.findByIdAndDelete(id);
  }
}
