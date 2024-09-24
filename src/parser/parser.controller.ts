import { Controller, Get, Post, Body } from '@nestjs/common';
import { ParserService } from './parser.service';
import fs from 'fs';

@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post()
  parseCode(@Body('code') code: string) {
    return this.parserService.parseCode(code);
  }

  @Get()
  getDefault(): string {
    const codeContent = fs.readFileSync('./CartEntryServlet.java', 'utf8');

    return this.parserService.parseCode(codeContent);
  }

}
