import { Injectable } from '@nestjs/common';
import { CreateShortageDto } from './dto/create-shortage.dto';
import { UpdateShortageDto } from './dto/update-shortage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Shortage } from './entities/shortage.entity';
import { Model } from 'mongoose';
import { Drug } from 'src/drugs/entities/drug.entity';

@Injectable()
export class ShortageService {
  constructor(
    @InjectModel(Drug.name) private drugModel: Model<Drug>,
    @InjectModel(Shortage.name) private shortageModel: Model<Shortage>,
  ) {}
  async create(createShortageDto: CreateShortageDto) {
    // const createdShortage = new this.shortageModel(createShortageDto);
    /**
     * Goal: create a drug model from the create shortageDto & and create a shortage model;
     * Step 1: extract the drugmodel fields from the shortageDTO;
     * Step 2: Create the drugmodel;
     * Step 3: extract the drugmodel id;
     * Step 4: save the drug model;
     * Step 5: create the shortages model;
     * Step 6: save the shortages model;
     */
    const {
      drug_name: name,
      drug_category: category,
      drug_manufacturer: manufacturer,
      ...shortageFields
    } = createShortageDto;
    const newDrug = new this.drugModel({
      name,
      manufacturer,
      category,
    });
    await newDrug.save();
    const { _id: drug_id } = newDrug;
    shortageFields['drug_id'] = drug_id;
    const newShortage = new this.shortageModel(shortageFields);
    return await newShortage.save();
  }
  async findAlternatives(drug_name: string) {
    //work in progress
    return this.shortageModel
      .find({ name: drug_name })
      .populate({
        path: 'drug_id',
        model: 'Drug',
        localField: 'drug_id',
        foreignField: '_id',
      })
      .exec();
  }
  async findAll(region: string = '', category: string = '') {
    const filter = {};
    if (region) {
      filter['region'] = region;
    }
    if (category) {
      filter['category'] = category;
    }
    return await this.shortageModel.find(filter).exec();
  }

  async findOne(id: string) {
    const result = await this.shortageModel
      .findById(id)
      .populate({
        path: 'drug_id',
        model: 'Drug',
        localField: 'drug_id',
        foreignField: '_id',
      })
      .exec();
    return result;
  }

  async update(id: string, updateShortageDto: UpdateShortageDto) {
    //when you think you have a reason to remove element from the alternatives array then implement it;
    if (updateShortageDto.alternatives) {
      const { alternatives, ...others } = updateShortageDto;
      return await this.shortageModel.findByIdAndUpdate(
        id,
        {
          $set: others,
          $addToSet: { alternatives: { $each: alternatives } },
        },
        { new: true },
      );
    }
    return await this.shortageModel.findByIdAndUpdate(id, updateShortageDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.shortageModel.findByIdAndDelete(id);
  }
}
