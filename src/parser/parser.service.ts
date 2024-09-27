import { Injectable } from '@nestjs/common'
import Parser, { Query, QueryCapture, SyntaxNode } from 'tree-sitter'
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
        
        // return this.printASTNodeInfo(tree.rootNode);

        const query = new Query(Java, '(class_declaration name: (identifier) @name) @definition.class');
        const captures = query.captures(tree.rootNode);
        let output = "";
        for(const cap of captures) {
            output += "Name: " + cap.name + "\n";
            output += "Node: " + cap.node + "\n\n";
        }
        return output;
    }

    printASTNodeInfo (rootNode: SyntaxNode) {
        let output = "Node type: " + rootNode.type + "\n";

        for(const child of rootNode.children) {
            output += "  - Child node type: " + child.type + "\n";

            if(child.children.length > 0 ) {
                output += this.printASTNodeInfo(child);
            } else {
                if(child.text) {
                    output += "    - Text Content: " + child.text + "\n";
                }
            }
        }

        return output;
    }
}