import { IsIn, IsOptional, IsString } from 'class-validator';

export default class GetCatsDto {
  @IsOptional()
  @IsString()
  @IsIn(['', 'id', 'suly', 'szem_szin'])
  sort?: 'id' | 'suly' | 'szem_szin';
}
