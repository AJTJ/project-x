import { Injectable } from '@nestjs/common';
import { Cat } from './dto/cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      name: 'Mega-Chonks',
      age: 88,
      breed: 'Chonker',
      id: '941926ea-bc2c-4a39-8c66-6625fb7bc73c',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
    return cat;
  }

  findAll(secretOfLife: number): Cat[] {
    console.log(secretOfLife);
    return this.cats;
  }

  meow(): string {
    return 'Meow';
  }

  findOne(id: string): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  findCatsByAge(catAge: number): Cat[] {
    return this.cats.filter((cat) => cat.age === catAge);
  }
}

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }
