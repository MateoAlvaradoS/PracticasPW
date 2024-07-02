import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/ty'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module ({
  imports:[
    TypeOrmModule.forRoot ({
      type : 'sqlite',
      database : 'ejemplo.db',
      entities : [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize : true ,
    }) ,],
    controllers : [ AppController ],
    providers : [ AppService ],
  })
  
  export class AppModule {}