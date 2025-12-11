import { Injectable, NotFoundException } from "@nestjs/common";
import { PartUsedRepository } from "src/infra/repositories/part-used.repository";
import { ServiceOrderRepository } from "src/infra/repositories/service-order.repository";
import { PartRepository } from "src/infra/repositories/part.repository";
import { CreatePartUsedDto } from "src/application/controllers/part-used/dtos/create-part-used.dto";
import { PartUsedResponseDto } from "src/application/controllers/part-used/dtos/part-used-response.dto";

@Injectable()
export class CreatePartUsedService {
  constructor(
    private readonly partUsedRepository: PartUsedRepository,
    private readonly serviceOrderRepository: ServiceOrderRepository,
    private readonly partRepository: PartRepository,
  ) { }

  async execute(data: CreatePartUsedDto): Promise<PartUsedResponseDto> {
    const os = await this.serviceOrderRepository.findOne({ where: { id: data.ordem_servico } });
    if (!os) throw new NotFoundException(`Ordem de Serviço ${data.ordem_servico} não encontrada.`);

    const part = await this.partRepository.findOne({ where: { id: data.peca } });
    if (!part) throw new NotFoundException(`Peça ${data.peca} não encontrada.`);

    const unitPrice = data.valor_unitario !== undefined ? data.valor_unitario : part.unitPrice;
    const subtotal = data.quantidade * Number(unitPrice);

    const partUsed = this.partUsedRepository.create({
      serviceOrderId: data.ordem_servico,
      partId: data.peca,
      quantity: data.quantidade,
      unitPrice: unitPrice,
      subtotal: subtotal,
    });

    const saved = await this.partUsedRepository.save(partUsed);
    saved.part = part;

    return PartUsedResponseDto.toDto(saved);
  }
}
