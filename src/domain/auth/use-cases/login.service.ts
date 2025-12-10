import { CustomerRepository } from "src/infra/repositories/customer.repository";
import { LoginResponseDto } from "src/application/controllers/auth/dtos/login-response.dto";
import { HashProvider } from "src/infra/gateways/hash-provider";
import { LoginDto } from "src/application/controllers/auth/dtos/login.dto";
import { Customer } from "src/infra/entities/customer/customer.entity";
import { GetCustomerByIdResponseDto } from "src/application/controllers/customer/dtos/get-customer-by-id-response.dto";
import { RequestCustomer } from "../interfaces/request-customer";

import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerRepository: CustomerRepository,
    private readonly hashProvider: HashProvider
  ) {}

  async execute(data: LoginDto): Promise<LoginResponseDto> {
    const { user, password } = data;
    const customer = await this.getExistingUser(user);
    await this.validatePassword(password, customer.password);
    
    if(!customer.id) {
      throw new BadRequestException("Usuário não encontrado.");
    }

    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION
    };
    const payload: RequestCustomer = { user: data.user, id: customer.id };
    const jwt = await this.jwtService.signAsync(payload, options);

    const customerResponse = GetCustomerByIdResponseDto.toDto(customer);
    return LoginResponseDto.toDto({
      token: jwt,
      expiresIn: options.expiresIn,
      customer: customerResponse,
    });
  }

  private async getExistingUser(user: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { user, isActive: true },
    });
    if(!customer) {
      throw new BadRequestException("Usuário não encontrado.");
    }
    return customer;
  }

  private async validatePassword(candidate: string, hash: string): Promise<void> {
    const passwordMatch = await this.hashProvider.compare(candidate, hash);
    if(!passwordMatch) {
      throw new BadRequestException("Usuário não encontrado.");
    }
  }

}
