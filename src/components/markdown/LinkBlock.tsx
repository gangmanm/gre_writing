import React from 'react';
import styled from '@emotion/styled';

interface LinkBlockProps {
  href: string;
  title: string;
  description?: string;
  isExternal?: boolean;
  theme: any;
}

const LinkBlockContainer = styled.div<{ theme: any }>`
  margin: 1.5rem 0;
  border: 1.5px solid ${props => props.theme.border};
  border-radius: 12px;
  background: ${props => props.theme.mode === 'dark' ? 'rgba(35, 39, 47, 0.5)' : '#f8fafc'};
  box-shadow: 0 4px 16px rgba(34, 139, 230, 0.07);
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  display: block;
  position: relative;

  &:hover {
    border-color: ${props => props.theme.primary};
    background: ${props => props.theme.mode === 'dark' ? 'rgba(35, 39, 47, 0.8)' : '#fff'};
    box-shadow: 0 6px 24px rgba(34, 139, 230, 0.13);
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.primary}, ${props => props.theme.primary}40);
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const StyledLink = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  color: inherit;
  text-decoration: none;
  background: none;
  width: 100%;
  position: relative;

  &:hover {
    text-decoration: none;
  }

  &::before {
    content: '🔗';
    font-size: 1.2rem;
    opacity: 0.8;
    margin-top: 0.2rem;
  }
`;

const LinkTitle = styled.div<{ theme: any }>`
  color: ${props => props.theme.primary};
  font-weight: 600;
  font-size: 1.15rem;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &::after {
    content: attr(data-external);
    font-size: 1rem;
    opacity: 0.7;
    margin-left: 0.2rem;
  }
`;

const LinkDescription = styled.div<{ theme: any }>`
  color: ${props => props.theme.text};
  font-size: 0.97rem;
  opacity: 0.85;
  margin-top: 0.1rem;
  line-height: 1.5;
`;

export const LinkBlock: React.FC<LinkBlockProps> = ({
  href,
  title,
  description,
  isExternal = false,
  theme
}) => {
  return (
    <LinkBlockContainer theme={theme}>
      <StyledLink
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <div>
          <LinkTitle theme={theme} data-external={isExternal ? '↗' : '→'}>
            {title}
          </LinkTitle>
          {description && (
            <LinkDescription theme={theme}>
              {description}
            </LinkDescription>
          )}
        </div>
      </StyledLink>
    </LinkBlockContainer>
  );
};

export default LinkBlock; 