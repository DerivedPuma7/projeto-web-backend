import { Expose } from "class-transformer";
import { PartUsed } from "src/infra/entities/part-used/part-used.entity";

export class PartUsedResponseDto {
  @Expose() id?: number;
  @Expose() ordem_servico_id: number;
  @Expose() peca_id: number;
  @Expose() nome_peca: string;
  @Expose() quantidade: number;
  @Expose() valor_unitario: number;
  @Expose() valor_total: number;
  @Expose() criado_em?: Date;

  static toDto(partUsed: PartUsed): PartUsedResponseDto {
    return {
      id: partUsed.id,
      ordem_servico_id: partUsed.serviceOrderId,
      peca_id: partUsed.partId,
      nome_peca: partUsed.part ? partUsed.part.name : '', 
      quantidade: partUsed.quantity,
      valor_unitario: typeof partUsed.unitPrice === 'string' ? parseFloat(partUsed.unitPrice) : partUsed.unitPrice,
      valor_total: typeof partUsed.subtotal === 'string' ? parseFloat(partUsed.subtotal) : partUsed.subtotal,
      criado_em: partUsed.createdAt,
    };
  }
}