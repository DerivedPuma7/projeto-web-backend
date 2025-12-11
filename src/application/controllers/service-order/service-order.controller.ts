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

import { CreateServiceOrderDto } from './dtos/create-service-order.dto';
import { UpdateServiceOrderDto } from './dtos/update-service-order.dto';
import { ServiceOrderResponseDto } from './dtos/service-order-response.dto';

import { CreateServiceOrderService } from 'src/domain/service-order/use-cases/create-service-order.service';
import { GetAllServiceOrdersService } from 'src/domain/service-order/use-cases/get-all-service-orders.service';
import { GetServiceOrderByIdService } from 'src/domain/service-order/use-cases/get-service-order-by-id.service';
import { UpdateServiceOrderService } from 'src/domain/service-order/use-cases/update-service-order.service';
import { DeleteServiceOrderService } from 'src/domain/service-order/use-cases/delete-service-order.service';

@Controller('service-orders')
@ApiTags('Service Orders')
export class ServiceOrderController {
  constructor(
    private readonly createService: CreateServiceOrderService,
    private readonly getAllService: GetAllServiceOrdersService,
    private readonly getByIdService: GetServiceOrderByIdService,
    private readonly updateService: UpdateServiceOrderService,
    private readonly deleteService: DeleteServiceOrderService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateServiceOrderDto): Promise<ServiceOrderResponseDto> {
    return this.createService.execute(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ServiceOrderResponseDto[]> {
    return this.getAllService.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceOrderResponseDto> {
    return this.getByIdService.execute(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateServiceOrderDto,
  ): Promise<ServiceOrderResponseDto> {
    return this.updateService.execute(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteService.execute(id);
  }
}
