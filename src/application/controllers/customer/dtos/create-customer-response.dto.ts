import { Expose, plainToClass } from "class-transformer";

export class CreateCustomerResponseDto {
  @Expose()
  id: string;

  @Expose()
  user: Date;

  static toDto(data: any) {
    return plainToClass(CreateCustomerResponseDto, data, {
      excludeExtraneousValues: true
    })
  }
}