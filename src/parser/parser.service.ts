import { Injectable } from '@nestjs/common';
import Parser, { Query, SyntaxNode } from 'tree-sitter';
import Java from 'tree-sitter-java';

@Injectable()
export class ParserService {
  private parser: Parser;

  constructor() {
    this.parser = new Parser();
    this.parser.setLanguage(Java);
  }

  parseCode(code: string) {
    const tree = this.parser.parse(code, undefined, {
      bufferSize: 1024 * 1024,
    });

    // return this.printASTNodeInfo(tree.rootNode);

    const query = new Query(
      Java,
      '(class_declaration name: (identifier) @name) @definition.class',
    );
    const captures = query.captures(tree.rootNode);
    let output = '';
    for (const cap of captures) {
      output += 'cap.Name: ' + cap.name + '\n';
      output += this.printASTNodeInfo(cap.node, '');
      output += '\n\n';
    }
    return output;
  }

  printASTNodeInfo(rootNode: SyntaxNode, strPrefix: string) {
    let output = strPrefix + 'Node type: ' + rootNode.type + '\n';

    for (const child of rootNode.children) {
      output += strPrefix + '  - Child node type: ' + child.type + '\n';

      if (child.children.length > 0) {
        output += this.printASTNodeInfo(child, strPrefix + '  ');
      } else {
        if (child.isNamed) {
          if (child.text) {
            output += strPrefix + '    - Text Content: ' + child.text + '\n';
          }
        }
      }
    }

    return output;
  }
}
