import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePartUsedDto } from './dtos/create-part-used.dto';
import { UpdatePartUsedDto } from './dtos/update-part-used.dto';
import { PartUsedResponseDto } from './dtos/part-used-response.dto';

import { CreatePartUsedService } from 'src/domain/part-used/use-cases/create-part-used.service';
import { GetAllPartUsedService } from 'src/domain/part-used/use-cases/get-all-part-used.service';
import { GetPartUsedByIdService } from 'src/domain/part-used/use-cases/get-part-used-by-id.service';
import { UpdatePartUsedService } from 'src/domain/part-used/use-cases/update-part-used.service';
import { DeletePartUsedService } from 'src/domain/part-used/use-cases/delete-part-used.service';

@Controller('part-used')
@ApiTags('Parts Used')
export class PartUsedController {
  constructor(
    private readonly createService: CreatePartUsedService,
    private readonly getAllService: GetAllPartUsedService,
    private readonly getByIdService: GetPartUsedByIdService,
    private readonly updateService: UpdatePartUsedService,
    private readonly deleteService: DeletePartUsedService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreatePartUsedDto): Promise<PartUsedResponseDto> {
    return this.createService.execute(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<PartUsedResponseDto[]> {
    return this.getAllService.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PartUsedResponseDto> {
    return this.getByIdService.execute(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePartUsedDto,
  ): Promise<PartUsedResponseDto> {
    return this.updateService.execute(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteService.execute(id);
  }
}
