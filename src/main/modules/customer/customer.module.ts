import { GetCustomerByIdService } from 'src/domain/customer/use-cases/get-customer-by-id.service';
import { CreateCustomerService } from 'src/domain/customer/use-cases/create-customer.service';
import { CustomerRepository } from 'src/infra/repositories/customer.repository';
import { DataFormater } from 'src/infra/gateways/dataFormater';

import { Module } from '@nestjs/common';
import { HashProvider } from 'src/infra/gateways/hash-provider';
import { CustomerController } from 'src/application/controllers/customer/customer.controller';
import { GetCustomerDashboardService } from 'src/domain/customer/use-cases/get-customer-dashboard.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CreateCustomerService,
    GetCustomerByIdService,
    CustomerRepository,
    DataFormater,
    HashProvider,
    GetCustomerDashboardService
  ],
})
export class CustomerModule { }
