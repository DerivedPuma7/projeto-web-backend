import {
  IsString,
  MaxLength,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateCustomerDto {
  @Expose()
  @IsString({ message: "user deve ser uma string" })
  user: string;

  @Expose()
  @IsString({ message: "password deve ser uma string" })
  @MaxLength(20, { message: "password deve ter no máximo 20 caracteres" })
  password: string;
}
