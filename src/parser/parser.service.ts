import { Injectable } from '@nestjs/common'
import Parser from 'tree-sitter'
import Java from 'tree-sitter-java'

@Injectable()
export class ParserService {
    private parser: Parser;

    constructor() {
        this.parser = new Parser();
        this.parser.setLanguage(Java);
    }

    parseCode(code: string) {
        const tree = this.parser.parse(code, undefined, { bufferSize: 1024 * 1024 });

        // const query = new Parser.Query(Java, '@definition.class');
        // const captures = query.captures(tree.rootNode);
        // return captures.toString();

        return tree.rootNode.toString();
    }
}