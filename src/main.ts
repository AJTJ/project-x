import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ClassValidationPipe } from './common/class-validation.pipe';
// import { RolesGuard } from './common/roles.guard';
// import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // A GLOBALLY SCOPED GUARD
  // app.useGlobalGuards(new RolesGuard());
  // A GLOBALLY SCOPED FILTER
  // app.useGlobalFilters(new HttpExceptionFilter());
  // GLOBALLY SCOPED VALIDATION PIPE
  // app.useGlobalPipes(new ClassValidationPipe());
  await app.listen(3000);
}
bootstrap();
