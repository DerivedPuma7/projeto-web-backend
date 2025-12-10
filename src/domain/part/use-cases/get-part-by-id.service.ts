import { Injectable, NotFoundException } from "@nestjs/common";
import { PartRepository } from "src/infra/repositories/part.repository";
import { PartResponseDto } from "src/application/controllers/part/dtos/part-response.dto";

@Injectable()
export class GetPartByIdService {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(id: number): Promise<PartResponseDto> {
    const part = await this.partRepository.findOne({ where: { id } });
    if (!part) {
      throw new NotFoundException(`Peça com ID ${id} não encontrada.`);
    }
    return PartResponseDto.toDto(part);
  }
}