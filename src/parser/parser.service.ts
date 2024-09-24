import { Injectable } from '@nestjs/common'
import Parser from 'tree-sitter'
import Java from 'tree-sitter-java'

@Injectable()
export class ParserService {
    private myParser: Parser;

    constructor() {
        this.myParser = new Parser();
        this.myParser.setLanguage(Java);
    }

    parseCode(code: string) {
        const tree = this.myParser.parse(code, undefined, { bufferSize: 1024 * 1024 });
        return tree.printDotGraph();
    }
}