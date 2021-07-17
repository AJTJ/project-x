import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    console.log(value, 'parse int pipe');
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Parse Int Pipe Validation failed');
    }
    return val;
  }
}
