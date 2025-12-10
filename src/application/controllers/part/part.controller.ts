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

import { CreatePartDto } from './dtos/create-part.dto';
import { UpdatePartDto } from './dtos/update-part.dto';
import { PartResponseDto } from './dtos/part-response.dto';

import { CreatePartService } from 'src/domain/part/use-cases/create-part.service';
import { GetAllPartsService } from 'src/domain/part/use-cases/get-all-parts.service';
import { GetPartByIdService } from 'src/domain/part/use-cases/get-part-by-id.service';
import { UpdatePartService } from 'src/domain/part/use-cases/update-part.service';
import { DeletePartService } from 'src/domain/part/use-cases/delete-part.service';

@Controller('pecas')
@ApiTags('Pecas')
export class PartController {
  constructor(
    private readonly createPartService: CreatePartService,
    private readonly getAllPartsService: GetAllPartsService,
    private readonly getPartByIdService: GetPartByIdService,
    private readonly updatePartService: UpdatePartService,
    private readonly deletePartService: DeletePartService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreatePartDto): Promise<PartResponseDto> {
    return this.createPartService.execute(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<PartResponseDto[]> {
    return this.getAllPartsService.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PartResponseDto> {
    return this.getPartByIdService.execute(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePartDto,
  ): Promise<PartResponseDto> {
    return this.updatePartService.execute(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deletePartService.execute(id);
  }
}