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
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background-color: ${props => getIconAndColor(props.type).bgColor};
  border-left: 4px solid ${props => getIconAndColor(props.type).color};
  ${props => props.type === 'essay' && `
    background-color: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 2rem 2.5rem;
    margin: 2rem auto;
  `}
`;

const Header = styled.div<{ type: InfoBoxType }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: ${props => getIconAndColor(props.type).color};
  font-weight: 600;

  svg {
    font-size: 1.25rem;
  }

  ${props => props.type === 'essay' && `
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #E5E7EB;
    color: #4B5563;
    font-family: system-ui, -apple-system, sans-serif;
    
    svg {
      font-size: 1.5rem;
      color: #4B5563;
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
    font-size: 1rem;
    line-height: 1.8;
    color: #1F2937;
    
    p {
      margin: 1.5rem 0;
      text-align: justify;
      letter-spacing: -0.003em;
      
      &:first-of-type {
        margin-top: 0;
        background: #F9FAFB;
        padding: 1rem 1.2rem;
        border-radius: 4px;
        text-align: left;
        margin-bottom: 2rem;
        
        strong {
          color: #374151;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.5rem;
        }
      }
      
      strong {
        color: #4B5563;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        display: inline-block;
        margin-bottom: 0.5rem;
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