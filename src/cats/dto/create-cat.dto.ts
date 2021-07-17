import { object, string, number } from 'joi';
import { IsString, IsInt, IsIn } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

// For schema based validation
export const CreateCatSchema = object({
  name: string(),
  age: number(),
  breed: string(),
});
