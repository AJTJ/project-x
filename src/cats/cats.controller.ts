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
  UseFilters,
  ForbiddenException,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Response } from 'express';

// SERVICES
import { CatsService } from './cats.service';

// DTO
import { CreateCat } from './dto/create-cat.dto';
import { Cat } from './dto/cat.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { v4 as uuidv4 } from 'uuid';

// This is a controller-scoped filter. It is applied to all requests.
// @UseFilters(new HttpExceptionFilter())
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // @Header('Cache-Control', 'none')
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async createCat(@Body() createCatDto: CreateCat): Promise<Cat[]> {
    const id = uuidv4();
    const newCat = { ...createCatDto, id };
    this.catsService.create(newCat);
    return this.catsService.findAll();
    // throw new ForbiddenException();
  }

  @Get('meow')
  @HttpCode(204)
  async getMeow(): Promise<string> {
    return this.catsService.meow();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  // OTHER EXAMPLES
  // REGEX-LIKE WILDCARD
  @Get('wild/ab*cd')
  findAllWild(): string {
    return 'this action uses a wildcard';
  }

  // AN HTTP EXCEPTION
  @Get('forbid')
  async getForbid() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  // A CUSTOM HTTP EXCEPTION
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

  // A REDIRECT
  @Get('redirect')
  @Redirect('https://www.google.com/')
  redirect(): string {
    return 'this route should redirect';
  }

  // CUSTOM URL PARAMETER
  @Get('id/:id')
  findOneCat(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a ${id} cat`;
  }

  // USING EXPRESS RESPONSE
  @Get('customResponse')
  customResponse(@Res() res: Response) {
    res.status(HttpStatus.OK).json(['customResponse']);
  }
}
