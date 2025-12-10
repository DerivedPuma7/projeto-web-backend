import { Injectable, NotFoundException } from "@nestjs/common";
import { PartRepository } from "src/infra/repositories/part.repository";
import { UpdatePartDto } from "src/application/controllers/part/dtos/update-part.dto";
import { PartResponseDto } from "src/application/controllers/part/dtos/part-response.dto";

@Injectable()
export class UpdatePartService {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(id: number, data: UpdatePartDto): Promise<PartResponseDto> {
    const part = await this.partRepository.findOne({ where: { id } });

    if (!part) {
      throw new NotFoundException(`Peça com ID ${id} não encontrada.`);
    }

    if (data.nome) part.name = data.nome;
    if (data.codigo !== undefined) part.code = data.codigo;
    if (data.fabricante !== undefined) part.brand = data.fabricante;
    if (data.preco_unitario !== undefined) part.unitPrice = data.preco_unitario;
    if (data.estoque_atual !== undefined) part.currentStock = data.estoque_atual;

    const updatedPart = await this.partRepository.save(part);
    return PartResponseDto.toDto(updatedPart);
  }
}
