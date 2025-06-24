import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { JsonList } from '../components/JsonList';

const customComponents: Partial<Components> = {
  p: ({ children, ...props }) => {
    const content = children as string;
    
    if (typeof content === 'string' && content.startsWith('@list[')) {
      try {
        const jsonStr = content.slice(content.indexOf('[') + 1, content.lastIndexOf(']'));
        const data = JSON.parse(jsonStr);
        return <JsonList {...data} />;
      } catch (e) {
        console.error('Failed to parse JSON list:', e);
        return <p {...props}>{children}</p>;
      }
    }

    return <p {...props}>{children}</p>;
  }
};

export const parseMarkdown = (content: string) => {
  return <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>;
}; 