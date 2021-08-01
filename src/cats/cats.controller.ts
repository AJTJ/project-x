import {
  Controller,
  Get,
  HttpCode,
  Post,
  Redirect,
  Param,
  Body,
  Res,
  HttpStatus,
  HttpException,
  UseFilters,
  ParseUUIDPipe,
  UsePipes,
  Query,
  DefaultValuePipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { Response } from 'express';

// SERVICES
import { CatsService } from './cats.service';

// DTO
import { CreateCatDto, CreateCatSchema } from './dto/create-cat.dto';
import { Cat } from './dto/cat.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { v4 as uuidv4 } from 'uuid';
import { JoiValidationPipe } from 'src/common/joi-validation.pipe';
import { ParseIntPipe } from 'src/common/parise-int.pipe';
import { RolesGuard } from 'src/common/roles.guard';

// This is a controller-scoped filter. It is applied to all requests.
// @UseFilters(new HttpExceptionFilter())
@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(
    // adding a default value
    @Query('secretOfLife', new DefaultValuePipe(42), ParseIntPipe)
    secretOfLife: number,
  ): Promise<Cat[]> {
    return this.catsService.findAll(secretOfLife);
  }

  // @Header('Cache-Control', 'none')
  @Post()
  // @UseFilters(new HttpExceptionFilter())
  // @UsePipes(new JoiValidationPipe(CreateCatSchema))
  // @Body(new ClassValidationPipe()) createCatDto: CreateCatDto,
  // SET METADATA USED TO APPLY A ROLE FOR THE GUARD
  @SetMetadata('roles', ['admin'])
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    const id = uuidv4();
    const newCat = { ...createCatDto, id };
    return this.catsService.create(newCat);
  }

  @Get('meow')
  // This custom http code will stop it from returning content
  // @HttpCode(204)
  async getMeow(): Promise<string> {
    return this.catsService.meow();
  }

  @Get(':id')
  async findById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Get('age/:age')
  async findByAge(
    @Param('age', new ParseIntPipe())
    age: number,
  ): Promise<Cat[]> {
    return this.catsService.findCatsByAge(age);
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
