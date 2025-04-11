import { Injectable, NotFoundException } from '@nestjs/common';
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
  /**
   * Creates a drug shortage document
   *
   * @param {CreateShortageDto} createShortageDto shortage document details
   * @returns {CreateShortageDto} Created shortage document
   */
  async create(createShortageDto: CreateShortageDto): Promise<any> {
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

  /**
   * Finds alternative drugs for a given drug name.
   *
   * This function searches the drug collection for a drug by its name.
   * If found, it looks up the shortage information using the drug's ID
   * and returns the list of alternative drugs if available.
   *
   * @param {string} drug_name - The name of the drug to find alternatives for.
   * @returns {Promise<string[] | undefined>} A promise that resolves to an array of alternative drug names or undefined if no alternatives are found.
   * @throws {NotFoundException} Throws an error if the drug is not found in the database.
   */
  async findAlternatives(drug_name: string): Promise<string[] | undefined> {
    //work in progress
    const drug = await this.drugModel.findOne({ name: drug_name }).exec();
    if (drug) {
      const id: string = drug['_id'];
      const shortageInfo = await this.shortageModel
        .findOne({ drug_id: id }, 'alternatives')
        .exec();
      return shortageInfo?.alternatives;
    } else {
      throw new NotFoundException();
    }
  }

  /**
   * Retrieves a list of shortages filtered by region and/or category.
   *
   * @param {string} [region=''] - The region to filter shortages by.
   * @param {string} [category=''] - The category to filter shortages by.
   * @returns {Promise<any[]>} A promise that resolves to an array of shortage documents.
   */
  async findAll(region: string = '', category: string = ''): Promise<any[]> {
    const filter = {};
    if (region) {
      filter['region'] = region;
    }
    if (category) {
      filter['category'] = category;
    }
    return await this.shortageModel.find(filter).exec();
  }

  /**
   * Retrieves a single shortage record by its ID, populating the related drug information.
   *
   * @param {string} id - The ID of the shortage document to retrieve.
   * @returns {Promise<any>} A promise that resolves to the shortage document with populated drug information.
   */
  async findOne(id: string): Promise<any> {
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

  /**
   *  Updates a single shortage record by ID
   * @param {string } id document ID
   * @param {UpdateShortageDto} updateShortageDto An object containing updated information
   * @returns {Promise<UpdateShortageDto>}
   */
  async update(
    id: string,
    updateShortageDto: UpdateShortageDto,
  ): Promise<CreateShortageDto | null> {
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

  /**
   * Deletes a document from the database
   * @param {string} id Document ID
   * @returns {Promise<any>}
   */
  remove(id: string): Promise<any> {
    return this.shortageModel.findByIdAndDelete(id);
  }
}
