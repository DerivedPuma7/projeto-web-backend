import { Module } from '@nestjs/common';
import { PartController } from 'src/application/controllers/part/part.controller';

import { CreatePartService } from 'src/domain/part/use-cases/create-part.service';
import { GetAllPartsService } from 'src/domain/part/use-cases/get-all-parts.service';
import { GetPartByIdService } from 'src/domain/part/use-cases/get-part-by-id.service';
import { UpdatePartService } from 'src/domain/part/use-cases/update-part.service';
import { DeletePartService } from 'src/domain/part/use-cases/delete-part.service';
import { PartRepository } from 'src/infra/repositories/part.repository';

@Module({
  controllers: [PartController],
  providers: [
    PartRepository,
    CreatePartService,
    GetAllPartsService,
    GetPartByIdService,
    UpdatePartService,
    DeletePartService,
  ],
  exports: [PartRepository],
})
export class PartModule { }
