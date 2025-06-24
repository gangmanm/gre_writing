import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Paragraph, Text } from 'mdast';

const INFO_REGEX = /@(info|warning|tip)\[(.*?)\]([\s\S]*?)(?=@(?:info|warning|tip)|\s*$)/g;

const remarkInfoBox: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node: Paragraph, index: number, parent: any) => {
      const textContent = (node.children[0] as Text)?.value || '';
      
      if (textContent.match(INFO_REGEX)) {
        const replacements: any[] = [];
        let lastIndex = 0;
        let match;

        while ((match = INFO_REGEX.exec(textContent)) !== null) {
          const [fullMatch, type, title, content] = match;
          
          replacements.push({
            type: 'html',
            value: `<div class="info-${type}${title ? ' ' + title : ''}">\n${content.trim()}\n</div>`
          });
        }

        if (replacements.length > 0) {
          parent.children.splice(index, 1, ...replacements);
          return index;
        }
      }
    });
  };
};

export default remarkInfoBox; 