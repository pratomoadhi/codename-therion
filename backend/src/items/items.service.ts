// src/items/items.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async findOne(id: number): Promise<Item | null> { // Updated return type
    return this.itemsRepository.findOne({ where: { id } });
  }

  async create(item: Partial<Item>): Promise<Item> {
    return this.itemsRepository.save(item);
  }

  async update(id: number, item: Partial<Item>): Promise<Item> {
    await this.itemsRepository.update(id, item);
    const updatedItem = await this.findOne(id);
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updatedItem;
  }

  async remove(id: number): Promise<void> {
    await this.itemsRepository.delete(id);
  }
}