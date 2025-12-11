import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './infra/database/datasource.config';
import { Customer } from './infra/entities/customer/customer.entity';
import { CustomerModule } from './main/modules/customer/customer.module';
import { AuthModule } from './main/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './main/modules/vehicle/vehicle.module';
import { PartModule } from './main/modules/part/part.module';
import { ServiceOrderModule } from './main/modules/service-order/service-order.module';
import { PartUsedModule } from './main/modules/part-used/part-used.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      dataSourceFactory: async () => {
        await dataSource.initialize();
        return dataSource;
      },
      useFactory: () => ({}),
    }),
    TypeOrmModule.forFeature([
      Customer,
    ]),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CustomerModule,
    AuthModule,
    VehicleModule,
    PartModule,
    ServiceOrderModule,
    PartUsedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
