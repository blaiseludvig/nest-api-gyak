import { IsEmpty, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export default class CatDataDto {
  @IsEmpty()
  id: number;
  @IsNumberString()
  suly: number;
  @IsString()
  @IsNotEmpty()
  szem_szin: string;
}
