import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Header,
  Redirect,
  Param,
  HostParam,
  Body,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

// SERVICES
import { CatsService } from './cats.service';

// DTO
import { CreateCat } from './dto/create-cat.dto';
import { Cat } from './dto/cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // @Header('Cache-Control', 'none')
  @Post()
  @HttpCode(204)
  createCat(@Body() createCatDto: CreateCat) {
    this.catsService.create(createCatDto);
  }

  @Get('meow')
  async getMeow(): Promise<string> {
    return this.catsService.meow();
  }

  // EXAMPLES
  @Get('wild/ab*cd')
  findAllWild(): string {
    return 'this action uses a wildcard';
  }

  @Get('forbid')
  async getForbid() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('customForbid')
  async getCustomForbid() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Custom error message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('redirect')
  @Redirect('https://www.google.com/')
  redirect(): string {
    return 'this route should redirect';
  }

  @Get('id/:id')
  findOneCat(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a ${id} cat`;
  }

  @Get('customResponse')
  customResponse(@Res() res: Response) {
    res.status(HttpStatus.OK).json(['customResponse']);
  }
}

// @Controller({ host: ':account.example.com' })
// @Get()
//   getInfo(@HostParam('account') account: string) {
//     return account;
//   }
