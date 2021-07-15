import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
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
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OtherLog, LoggerMiddleware)
      .exclude('cats/meow')
      .forRoutes({ path: 'cats/*', method: RequestMethod.GET });
  }
}
