export class CreateShortageDto {
  drug_name: string;
  drug_manufacturer: string;
  drug_category: string;
  region: string;
  status: string;
  reported_by: string;
  reported_at: Date;
  estimated_restock: Date;
  reason: string;
  alternatives: string[];
}
