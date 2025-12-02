import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginDto {
  @Expose()
  @IsString({ message: "user deve ser uma string" })
  @IsNotEmpty({ message: "user é obrigatório" })
  user: string;

  @Expose()
  @IsString({ message: "password deve ser uma string" })
  @IsNotEmpty({ message: "password é obrigatório" })
  password: string;
}
