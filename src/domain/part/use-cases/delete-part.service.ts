import { Injectable, NotFoundException } from "@nestjs/common";
import { PartRepository } from "src/infra/repositories/part.repository";

@Injectable()
export class DeletePartService {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(id: number): Promise<void> {
    const part = await this.partRepository.findOne({ where: { id } });

    if (!part) {
      throw new NotFoundException(`Peça com ID ${id} não encontrada.`);
    }

    await this.partRepository.delete(id);
  }
}