// src/items/items.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '../item.entity';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Item | null> {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() item: Partial<Item>): Promise<Item> {
    return this.itemsService.create(item);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() item: Partial<Item>): Promise<Item> {
    return this.itemsService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.itemsService.remove(id);
  }
}