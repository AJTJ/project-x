import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationPipe {
  transform(value: string, rules: string): string {
    return value;
  }
}
