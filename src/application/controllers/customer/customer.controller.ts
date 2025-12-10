import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CreateCustomerService } from 'src/domain/customer/use-cases/create-customer.service';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
} from '@nestjs/swagger';
import { CreateCustomerResponseDto } from './dtos/create-customer-response.dto';
import { GetCustomerByIdResponseDto } from './dtos/get-customer-by-id-response.dto';
import { GetCustomerByIdService } from 'src/domain/customer/use-cases/get-customer-by-id.service';
import { GetCustomerDashboardService } from 'src/domain/customer/use-cases/get-customer-dashboard.service';
import { GetCustomerDashboardResponseDto } from './dtos/get-customer-dashboard-response.dto';

@Controller('customers')
@ApiTags('Customers')
export class CustomerController {
  constructor(
    private readonly createCustomerService: CreateCustomerService,
    private readonly getCustomerByIdService: GetCustomerByIdService,
    private readonly getCustomerDashboardService: GetCustomerDashboardService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {
    return this.createCustomerService.execute(createCustomerDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.CREATED)
  async getCustomerById(
    @Param('id') customerId: string
  ): Promise<GetCustomerByIdResponseDto> {
    return this.getCustomerByIdService.execute(Number(customerId));
  }

  @Get(':id/dashboard')
  @HttpCode(HttpStatus.OK)
  async getCustomerDashboard(
    @Param('id') customerId: string
  ): Promise<GetCustomerDashboardResponseDto> {
    return this.getCustomerDashboardService.execute(Number(customerId));
  }
}