import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParserController } from './parser/parser.controller';
import { ParserService } from './parser/parser.service';

@Module({
  imports: [],
  controllers: [AppController,ParserController],
  providers: [AppService, ParserService],
})
export class AppModule {}
