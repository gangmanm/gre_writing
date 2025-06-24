import React from 'react';
import styled from '@emotion/styled';

interface ListItem {
  name?: string;
  description?: string;
  content?: string;
  children?: ListItem[];
}

interface JsonListProps {
  title: string;
  items: ListItem[];
  icon?: string;
  type?: 'ordered' | 'unordered';
}

const ListContainer = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #343a40;
    font-weight: 600;
  }
  
  span {
    font-size: 1.2rem;
  }
`;

const ListItemContainer = styled.div<{ depth: number }>`
  margin-left: ${props => (props.depth + 1) * 1.5}rem;
  margin-bottom: 0.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -1rem;
    top: 0.7rem;
    width: 0.5rem;
    height: 0.5rem;
    background: #228be6;
    border-radius: 50%;
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: -0.75rem;
    top: 1rem;
    width: 1px;
    height: calc(100% + 0.5rem);
    background: #dee2e6;
  }
`;

const ItemContent = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.25rem 0;
  
  .name {
    color: #228be6;
    font-weight: 500;
    font-family: monospace;
  }
  
  .description {
    color: #495057;
  }

  .content {
    color: #495057;
  }
`;

const renderItems = (items: ListItem[], depth = 0): React.ReactNode => {
  return items.map((item, index) => (
    <ListItemContainer key={index} depth={depth}>
      <ItemContent>
        {item.name && <span className="name">{item.name}</span>}
        {item.description && <span className="description">{item.description}</span>}
        {item.content && <span className="content">{item.content}</span>}
      </ItemContent>
      {item.children && renderItems(item.children, depth + 1)}
    </ListItemContainer>
  ));
};

export const JsonList: React.FC<JsonListProps> = ({ title, items, icon, type = 'unordered' }) => {
  return (
    <ListContainer>
      <ListHeader>
        {icon && <span>{icon}</span>}
        <h3>{title}</h3>
      </ListHeader>
      {renderItems(items)}
    </ListContainer>
  );
};

export default JsonList; 