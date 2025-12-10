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
import { CreateVehicleDto } from './dtos/crete-vehicle.dto';
import { CreateVehicleService } from 'src/domain/vehicle/use-cases/create-vehicle.service';
import { VehicleResponseDto } from './dtos/vehicle-response.dto';
import { GetAllVehiclesService } from 'src/domain/vehicle/use-cases/get-all-vehicles.service';
import { GetVehicleByIdService } from 'src/domain/vehicle/use-cases/get-vehicle-by-id.service';
import { UpdateVehicleService } from 'src/domain/vehicle/use-cases/update-vehicle.service';
import { DeleteVehicleService } from 'src/domain/vehicle/use-cases/delete-vehicle.service';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly createVehicleService: CreateVehicleService,
    private readonly getAllVehiclesService: GetAllVehiclesService,
    private readonly getVehicleByIdService: GetVehicleByIdService,
    private readonly updateVehicleService: UpdateVehicleService,
    private readonly deleteVehicleService: DeleteVehicleService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleResponseDto> {
    return this.createVehicleService.execute(createVehicleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllVehicles(): Promise<VehicleResponseDto[]> {
    return this.getAllVehiclesService.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getVehicleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VehicleResponseDto> {
    return this.getVehicleByIdService.execute(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleResponseDto> {
    return this.updateVehicleService.execute(id, updateVehicleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVehicle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.deleteVehicleService.execute(id);
  }
}