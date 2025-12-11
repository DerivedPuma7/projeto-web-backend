import { Injectable, NotFoundException } from "@nestjs/common";
import { PartUsedRepository } from "src/infra/repositories/part-used.repository";
import { PartUsedResponseDto } from "src/application/controllers/part-used/dtos/part-used-response.dto";

@Injectable()
export class GetPartUsedByIdService {
  constructor(private readonly partUsedRepository: PartUsedRepository) { }

  async execute(id: number): Promise<PartUsedResponseDto> {
    const item = await this.partUsedRepository.findOne({
      where: { id },
      relations: ['part']
    });

    if (!item) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado.`);
    }

    return PartUsedResponseDto.toDto(item);
  }
}
