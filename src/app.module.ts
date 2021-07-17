import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { CatsModule } from './cats/cats.module';
import { ClassValidationPipe } from './common/class-validation.pipe';
import { LoggerMiddleware, OtherLog } from './common/logger.middleware';
// import { GraphQLModule } from '@nestjs/graphql';
// import { join } from 'path/posix';

// const prodOptions = {
//   debug: false,
//   playground: false,
// };

@Module({
  imports: [
    CatsModule,
    // GraphQLModule.forRoot({
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    //   include: [CatsModule],
    // }),
  ],
  // Another way of instantiating a global pipe that also accepts dependencies
  providers: [
    {
      provide: APP_PIPE,
      useClass: ClassValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OtherLog, LoggerMiddleware)
      .exclude('cats/meow')
      .forRoutes({ path: 'cats/*', method: RequestMethod.GET });
  }
}
