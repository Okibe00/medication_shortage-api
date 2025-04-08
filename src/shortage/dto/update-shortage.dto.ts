import { PartialType } from '@nestjs/mapped-types';
import { CreateShortageDto } from './create-shortage.dto';

export class UpdateShortageDto extends PartialType(CreateShortageDto) {}
