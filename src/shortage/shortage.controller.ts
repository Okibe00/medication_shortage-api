import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShortageService } from './shortage.service';
import { CreateShortageDto } from './dto/create-shortage.dto';
import { UpdateShortageDto } from './dto/update-shortage.dto';

@Controller('shortage')
export class ShortageController {
  constructor(private readonly shortageService: ShortageService) {}

  @Post('/report')
  create(@Body() createShortageDto: CreateShortageDto) {
    return this.shortageService.create(createShortageDto);
  }
  @Get('/alternatives')
  findAlternatives(@Query() data: { drug_name: string }) {
    /**
     * Goal: fetch the alternatives of a giving drug from  the shortages document
     * Step: fetch data from shortages documen and join with drug table
     */
    return this.shortageService.findAlternatives(data.drug_name);
  }
  @Get()
  findAll(@Query() data: { region?: string; category?: string; name: string }) {
    /**
     * Query Parameters: drug_name, region, category
     * Goal: filter find all result by drug_name, region adn category or all three if possible;
     * Step 1: Extract all the filter from the request
     * Step 2: Check for null.
     * Step 3: Pass the filters to the the service and filter
     */
    // console.log(data);
    const { region, category, name } = data;
    // console.log(region, category);
    return this.shortageService.findAll(region, category, name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortageDto: UpdateShortageDto,
  ) {
    return this.shortageService.update(id, updateShortageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortageService.remove(id);
  }
}
