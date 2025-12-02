import { LoginService } from 'src/domain/auth/use-cases/login.service';
import { LoginDto } from './dtos/login.dto';

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
  ) {}

  @Post("login")
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    return this.loginService.execute(loginDto);
  }
}