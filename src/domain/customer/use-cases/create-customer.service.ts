import { CustomerRepository } from "src/infra/repositories/customer.repository";
import { WalletRepository } from "src/infra/repositories/wallet.repository";

import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "src/application/controllers/customer/dtos/create-customer.dto";
import { DataFormater } from "src/infra/gateways/dataFormater";
import { HashProvider } from "src/infra/gateways/hash-provider";
import { CreateCustomerResponseDto } from "src/application/controllers/customer/dtos/create-customer-response.dto";

@Injectable()
export class CreateCustomerService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly dataFormater: DataFormater,
    private readonly hashProvider: HashProvider
  ) {}

  async execute(data: CreateCustomerDto): Promise<CreateCustomerResponseDto> {
    this.formatData(data);
    await this.validateExistingUser(data);

    const passwordHash = await this.hashProvider.handle(data.password);
    const customer = this.customerRepository.create({
      user: data.user,
      password: passwordHash,
    });
    await this.customerRepository.save(customer);

    return CreateCustomerResponseDto.toDto(customer);
  }

  private formatData(data: CreateCustomerDto): void {
    data = this.dataFormater.trimData(data);
  }

  private async validateExistingUser(data: CreateCustomerDto): Promise<void> {
    await this.validateExistingUsername(data.user);
  }

  private async validateExistingUsername(user: string): Promise<void> {
    const existingCustomer = await this.customerRepository.findOne({
      where: {
        user
      }
    });
    if(existingCustomer) {
      throw new ConflictException("Já existe um usuário cadastrado com esse email.");
    }
  }
}
