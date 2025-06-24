import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
`;

const Title = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: attr(data-icon);
    font-size: 1.4rem;
  }
`;

const ContentBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #edf2f7;
  border-radius: 8px;
  padding: 1.25rem;
  margin: 0.75rem 0;
  transition: all 0.2s ease-in-out;
  counter-increment: item;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
    border-color: #e2e8f0;
  }
`;

const ContentTitle = styled.div<{ color?: string }>`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;

  &::before {
    content: counter(item);
    color: ${props => props.color || '#4a5568'};
    font-size: 0.875rem;
    font-weight: 600;
    background-color: ${props => props.color ? `${props.color}15` : '#f7fafc'};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

const ContentDescription = styled.div`
  color: #4a5568;
  font-size: 0.925rem;
  line-height: 1.6;
  margin-left: 2.25rem;

  ul {
    margin: 0.75rem 0 0 0;
    padding-left: 1.25rem;
    list-style-type: none;

    li {
      margin: 0.4rem 0;
      color: #718096;
      position: relative;

      &::before {
        content: "•";
        position: absolute;
        left: -1rem;
        color: #a0aec0;
      }
    }
  }
`;

export const sections = {
  introduction: {
    color: '#48bb78',
    bgColor: '#f0fff4',
    icon: '📚'
  },
  issue: {
    color: '#4299e1',
    bgColor: '#ebf8ff',
    icon: '✍️'
  },
  argument: {
    color: '#9f7aea',
    bgColor: '#faf5ff',
    icon: '🎯'
  },
  scoring: {
    color: '#f56565',
    bgColor: '#fff5f5',
    icon: '📊'
  },
  practice: {
    color: '#ed8936',
    bgColor: '#fffaf0',
    icon: '🔄'
  },
  tips: {
    color: '#38b2ac',
    bgColor: '#e6fffa',
    icon: '💡'
  }
} as const;

const SectionContainer = styled(Container)<{ sectionType: keyof typeof sections }>`
  position: relative;
  border-left: none;
  background-color: ${props => sections[props.sectionType].bgColor};
  counter-reset: item;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: ${props => sections[props.sectionType].color};
    border-radius: 3px;
  }
`;

interface ContentItemProps {
  title: string;
  description: string;
  details?: string[];
  color?: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ title, description, details, color }) => (
  <ContentBox>
    <ContentTitle color={color}>{title}</ContentTitle>
    <ContentDescription>
      {description}
      {details && (
        <ul>
          {details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      )}
    </ContentDescription>
  </ContentBox>
);

interface DocSectionProps {
  title: string;
  sectionType: keyof typeof sections;
  items: Array<ContentItemProps>;
}

export const DocSection: React.FC<DocSectionProps> = ({ title, sectionType, items }) => (
  <SectionContainer sectionType={sectionType}>
    <Title data-icon={sections[sectionType].icon}>{title}</Title>
    {items.map((item, index) => (
      <ContentItem
        key={index}
        title={item.title}
        description={item.description}
        details={item.details}
        color={sections[sectionType].color}
      />
    ))}
  </SectionContainer>
);

export default {
  DocSection,
}; 