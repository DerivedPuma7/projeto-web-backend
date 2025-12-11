import { Injectable, NotFoundException } from "@nestjs/common";
import { PartUsedRepository } from "src/infra/repositories/part-used.repository";

@Injectable()
export class DeletePartUsedService {
  constructor(private readonly partUsedRepository: PartUsedRepository) { }

  async execute(id: number): Promise<void> {
    const item = await this.partUsedRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado.`);
    }

    await this.partUsedRepository.delete(id);
  }
}
