import React from 'react';
import styled from '@emotion/styled';
import { FaInfoCircle, FaExclamationTriangle, FaLightbulb, FaEdit } from 'react-icons/fa';

type InfoBoxType = 'info' | 'warning' | 'tip' | 'essay';

interface InfoBoxProps {
  type?: InfoBoxType;
  title?: string;
  children: React.ReactNode;
}

const getIconAndColor = (type: InfoBoxType) => {
  switch (type) {
    case 'warning':
      return {
        icon: FaExclamationTriangle,
        color: '#F59E0B',
        bgColor: '#FEF3C7'
      };
    case 'tip':
      return {
        icon: FaLightbulb,
        color: '#10B981',
        bgColor: '#ECFDF5'
      };
    case 'essay':
      return {
        icon: FaEdit,
        color: '#4B5563',
        bgColor: '#FFFFFF'
      };
    default:
      return {
        icon: FaInfoCircle,
        color: '#3B82F6',
        bgColor: '#EFF6FF'
      };
  }
};

const Container = styled.div<{ type: InfoBoxType }>`
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  margin: 1rem 0;
  background-color: ${props => getIconAndColor(props.type).bgColor};
  border-left: 4px solid ${props => getIconAndColor(props.type).color};
  ${props => props.type === 'essay' && `
    background-color: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  `}
`;

const Header = styled.div<{ type: InfoBoxType }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #F3F4F6;
  color: ${props => getIconAndColor(props.type).color};
  font-weight: 600;

  svg {
    font-size: 1.25rem;
  }

  ${props => props.type === 'essay' && `
    color: #6B7280;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 1rem;
    
    svg {
      font-size: 1.2rem;
      color: #9CA3AF;
    }
  `}
`;

const Content = styled.div<{ type?: InfoBoxType }>`
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.6;

  p {
    margin: 0.5rem 0;
    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  ${props => props.type === 'essay' && `
    color: #4B5563;
    font-size: 0.95rem;
    line-height: 1.6;
    
    h3 {
      color: #374151;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 1rem;
      font-weight: 500;
      margin: 1rem 0 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &:first-of-type {
        margin-top: 0;
      }
      
      span.task-number {
        color: #6B7280;
        font-weight: 500;
        font-size: 1em;
      }
    }
    
    p {
      margin: 0.75rem 0;
      color: #4B5563;
      
      &:first-of-type {
        margin-top: 0;
        background: #F9FAFB;
        padding: 0.75rem 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        
        strong {
          color: #6B7280;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          display: block;
          margin-bottom: 0.25rem;
        }
      }
      
      strong {
        color: #4B5563;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 0.95rem;
        font-weight: 500;
        display: inline-block;
        margin-bottom: 0.25rem;
      }
    }
  `}
`;

export const InfoBox: React.FC<InfoBoxProps> = ({ type = 'info', title, children }) => {
  const { icon: Icon } = getIconAndColor(type);

  return (
    <Container type={type}>
      <Header type={type}>
        <Icon />
        {title || type.charAt(0).toUpperCase() + type.slice(1)}
      </Header>
      <Content type={type}>{children}</Content>
    </Container>
  );
}; 