import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './infra/database/datasource.config';
import { Wallet } from './infra/entities/transaction/wallet.entity';
import { Customer } from './infra/entities/customer/customer.entity';
import { TransactionHistory } from './infra/entities/transaction/transaction-history.entity';
import { CustomerModule } from './main/modules/customer/customer.module';
import { AuthModule } from './main/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './main/modules/vehicle/vehicle.module';
import { PartModule } from './main/modules/part/part.module';

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
      Wallet,
      Customer,
      TransactionHistory,
      
    ]),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CustomerModule,
    AuthModule,
    VehicleModule,
    PartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
