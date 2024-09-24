import { Controller, Get, Post, Body } from '@nestjs/common';
import { ParserService } from './parser.service';

@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post()
  parseCode(@Body('code') code: string) {
    return this.parserService.parseCode(code);
  }

  @Get()
  getHello(): string {
    return "Parse Controller: Still gotta do something here. :-D";
  }

}
