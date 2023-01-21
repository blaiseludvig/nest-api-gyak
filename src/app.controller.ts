import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import GetCatsDto from './GetCats.dto';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/cats')
  async allUsers(@Query() query: GetCatsDto) {
    let sort = query.sort;
    sort = sort ? sort : 'id';
    console.log(sort);

    const [cats] = await db.execute(`
    SELECT suly, szem_szin
    FROM macskak
    ORDER BY ${sort} ASC
    `);

    return { cats: cats };
  }
}
