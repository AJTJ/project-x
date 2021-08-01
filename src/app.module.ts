import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { APP_GUARD } from '@nestjs/core';
import { CatsModule } from './cats/cats.module';
import { ClassValidationPipe } from './common/class-validation.pipe';
import { RolesGuard } from './common/roles.guard';
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
      // APPLYING GUARD AT WHAT SEEMS TO BE THE MODULE LEVEL BUT THIS IS IN FACT GLOBAL
      // provide: APP_GUARD,
      // useClass: RolesGuard,
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
