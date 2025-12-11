import { Injectable, NotFoundException } from "@nestjs/common";
import { ServiceOrderRepository } from "src/infra/repositories/service-order.repository";

@Injectable()
export class DeleteServiceOrderService {
  constructor(private readonly serviceOrderRepository: ServiceOrderRepository) { }

  async execute(id: number): Promise<void> {
    const os = await this.serviceOrderRepository.findOne({ where: { id } });

    if (!os) {
      throw new NotFoundException(`Ordem de Serviço com ID ${id} não encontrada.`);
    }

    await this.serviceOrderRepository.delete(id);
  }
}
