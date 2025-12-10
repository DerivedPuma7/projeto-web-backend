import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateVehicleDto } from './dtos/crete-vehicle.dto';
import { CreateVehicleService } from 'src/domain/vehicle/use-cases/create-vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly createVehicleService: CreateVehicleService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<any> {
    return this.createVehicleService.execute(createVehicleDto);
  }
}