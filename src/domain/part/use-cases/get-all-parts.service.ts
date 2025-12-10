import { Injectable } from "@nestjs/common";
import { PartRepository } from "src/infra/repositories/part.repository";
import { PartResponseDto } from "src/application/controllers/part/dtos/part-response.dto";

@Injectable()
export class GetAllPartsService {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(): Promise<PartResponseDto[]> {
    const parts = await this.partRepository.find({
      order: { createdAt: 'DESC' }
    });
    return parts.map(part => PartResponseDto.toDto(part));
  }
}