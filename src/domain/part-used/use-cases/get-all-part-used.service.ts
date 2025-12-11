import { Injectable } from "@nestjs/common";
import { PartUsedRepository } from "src/infra/repositories/part-used.repository";
import { PartUsedResponseDto } from "src/application/controllers/part-used/dtos/part-used-response.dto";

@Injectable()
export class GetAllPartUsedService {
  constructor(private readonly partUsedRepository: PartUsedRepository) { }

  async execute(): Promise<PartUsedResponseDto[]> {
    const items = await this.partUsedRepository.find({
      relations: ['part'],
      order: { createdAt: 'DESC' }
    });
    return items.map(item => PartUsedResponseDto.toDto(item));
  }
}
