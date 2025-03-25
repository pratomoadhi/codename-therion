import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(__dirname, '..', 'data', 'database.sqlite'), // Use path.resolve
      entities: [path.resolve(__dirname, '**', '*.entity.js')],
      synchronize: true,
      migrations: [path.resolve(__dirname, 'migrations', '*.js')],
      migrationsRun: true,
    }),
    ItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
