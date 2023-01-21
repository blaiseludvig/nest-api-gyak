import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import GetCatsDto from './GetCats.dto';
import db from './db';
import CatDataDto from './CatData.dto';
import { Field, FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  async index() {
    return;
  }

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

  @Get('/api/cats/:id')
  async oneCat(@Param('id') id: number) {
    const [cat] = await db.execute(`
    SELECT suly, szem_szin
    FROM macskak
    WHERE id = ${id}
    `);

    return cat[0];
  }

  @Delete('/api/cats/:id')
  async deleteCat(@Param('id') id: number) {
    await db.execute(`
    DELETE FROM macskak
    WHERE id = ${id};
    `);
  }

  @Post('/api/cats')
  async insertUser(@Body() catData: CatDataDto) {
    const result: [ResultSetHeader, FieldPacket[]] = await db.execute(`
    INSERT INTO macskak (suly, szem_szin)
    VALUES (
    "${catData.suly}",
    "${catData.szem_szin}"
    );
    `);

    const newCatId = result[0].insertId;
    const [newCat]: [RowDataPacket[], FieldPacket[]] = await db.execute(`
    SELECT *
    FROM macskak
    WHERE id = ${newCatId}
    `);

    return newCat[0];
  }
}
