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

    const query = new Query(
      Java,
      '(class_declaration name: (identifier) @name) @definition.class',
    );
    const captures = query.captures(tree.rootNode);
    let output = '';
    for (const cap of captures) {
      output += 'capture.Name: ' + cap.name + '\n';
      output += 'capture.node.type: ' + cap.node.type + '\n';
      if(cap.name === 'name') {
        output += 'capture.node.text: ' + cap.node.text + '\n';
      }
      // output += this.printASTNodeInfo(cap.node, '');
      output += '\n\n';
    }
    return output;
  }

  printASTNodeInfo(rootNode: SyntaxNode, strPrefix: string) {
    let output = '';
    if (rootNode.isNamed) {
      output += strPrefix + 'Node type: ' + rootNode.type + '\n';
      if(rootNode.type === 'identifier'){
        output += strPrefix + 'Node text: ' + rootNode.text + '\n';
      }
    }

    // for (const child of rootNode.children) {
    //   if (child.children.length > 0) {
    //     output += this.printASTNodeInfo(child, strPrefix + '  ');
    //   } else {
    //     if (child.isNamed) {
    //       if (child.text) {
    //         output += strPrefix + '  - Child node type: ' + child.type + '\n';
    //         output += strPrefix + '    - Text Content: ' + child.text + '\n';
    //       }
    //     }
    //   }
    // }

    return output;
  }
}
