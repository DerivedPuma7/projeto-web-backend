import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { PartRepository } from "src/infra/repositories/part.repository";
import { CreatePartDto } from "src/application/controllers/part/dtos/create-part.dto";
import { PartResponseDto } from "src/application/controllers/part/dtos/part-response.dto";

@Injectable()
export class CreatePartService {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(data: CreatePartDto): Promise<PartResponseDto> {
    await this.verifyIfPartCodeExists(data.codigo);

    const part = this.partRepository.create({
      name: data.nome,
      code: data.codigo,
      brand: data.fabricante,
      unitPrice: data.preco_unitario,
      currentStock: data.estoque_atual,
    });

    const savedPart = await this.partRepository.save(part);
    return PartResponseDto.toDto(savedPart);
  }

  private async verifyIfPartCodeExists(code: string): Promise<void> {
    const existingPart = await this.partRepository.findOne({ where: { code } });
    if (existingPart) {
      throw new ConflictException(`Peça com o código ${code} já existe.`);
    }
  }
}
