import { Module } from '@nestjs/common';
import { PartUsedController } from 'src/application/controllers/part-used/part-used.controller';
import { CreatePartUsedService } from 'src/domain/part-used/use-cases/create-part-used.service';
import { GetAllPartUsedService } from 'src/domain/part-used/use-cases/get-all-part-used.service';
import { GetPartUsedByIdService } from 'src/domain/part-used/use-cases/get-part-used-by-id.service';
import { UpdatePartUsedService } from 'src/domain/part-used/use-cases/update-part-used.service';
import { DeletePartUsedService } from 'src/domain/part-used/use-cases/delete-part-used.service';
import { PartUsedRepository } from 'src/infra/repositories/part-used.repository';
import { ServiceOrderRepository } from 'src/infra/repositories/service-order.repository';
import { PartRepository } from 'src/infra/repositories/part.repository';

@Module({
  imports: [],
  controllers: [PartUsedController],
  providers: [
    PartUsedRepository,
    ServiceOrderRepository,
    PartRepository,
    CreatePartUsedService,
    GetAllPartUsedService,
    GetPartUsedByIdService,
    UpdatePartUsedService,
    DeletePartUsedService,
  ],
  exports: [PartUsedRepository],
})
export class PartUsedModule { }
