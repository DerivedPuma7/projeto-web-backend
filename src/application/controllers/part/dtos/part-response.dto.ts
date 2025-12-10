import { Expose } from "class-transformer";
import { Part } from "src/infra/entities/part/part.entity";

export class PartResponseDto {
  @Expose() id?: number;
  @Expose() nome: string;
  @Expose() codigo: string;
  @Expose() fabricante: string;
  @Expose() preco_unitario: number;
  @Expose() estoque_atual: number;
  @Expose() criado_em?: Date;
  @Expose() atualizado_em?: Date;

  static toDto(part: Part): PartResponseDto {
    return {
      id: part.id,
      nome: part.name,
      codigo: part.code,
      fabricante: part.brand,
      preco_unitario: parseFloat(part.unitPrice as any), 
      estoque_atual: part.currentStock,
      criado_em: part.createdAt,
      atualizado_em: part.updatedAt,
    };
  }
}