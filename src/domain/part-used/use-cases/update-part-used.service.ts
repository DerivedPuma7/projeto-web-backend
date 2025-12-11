import { Injectable, NotFoundException } from "@nestjs/common";
import { PartUsedRepository } from "src/infra/repositories/part-used.repository";
import { UpdatePartUsedDto } from "src/application/controllers/part-used/dtos/update-part-used.dto";
import { PartUsedResponseDto } from "src/application/controllers/part-used/dtos/part-used-response.dto";

@Injectable()
export class UpdatePartUsedService {
  constructor(private readonly partUsedRepository: PartUsedRepository) { }

  async execute(id: number, data: UpdatePartUsedDto): Promise<PartUsedResponseDto> {
    const item = await this.partUsedRepository.findOne({
      where: { id },
      relations: ['part']
    });

    if (!item) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado.`);
    }

    if (data.quantidade !== undefined) item.quantity = data.quantidade;
    if (data.valor_unitario !== undefined) item.unitPrice = data.valor_unitario;

    item.subtotal = item.quantity * Number(item.unitPrice);

    const updated = await this.partUsedRepository.save(item);
    return PartUsedResponseDto.toDto(updated);
  }
}
