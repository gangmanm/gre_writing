import React from 'react';
import styled from '@emotion/styled';
import { FaEdit } from 'react-icons/fa';

interface EssayProps {
  taskNumber: string;
  topic: string;
  children: React.ReactNode;
}

const Container = styled.div`
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background-color: #FAFAFA;
  border: 1px solid #E5E7EB;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #3B82F6;
  font-weight: 600;

  svg {
    font-size: 1.25rem;
  }
`;

const TaskNumber = styled.div`
  font-size: 1rem;
  color: #4B5563;
  margin-bottom: 0.75rem;
`;

const Topic = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #E5E7EB;
`;

const Content = styled.div`
  color: #374151;
  font-size: 1rem;
  line-height: 1.8;

  p {
    margin: 1rem 0;
    text-align: justify;
    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const Essay: React.FC<EssayProps> = ({ taskNumber, topic, children }) => {
  return (
    <Container>
      <Header>
        <FaEdit />
        Essay
      </Header>
      <TaskNumber>Task {taskNumber}</TaskNumber>
      <Topic>{topic}</Topic>
      <Content>{children}</Content>
    </Container>
  );
};

export default Essay; 