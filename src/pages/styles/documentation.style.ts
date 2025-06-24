import styled from '@emotion/styled';

export const DocLayout = styled.div<{ theme: any }>`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 250px;
  background-color: ${props => props.theme.background};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    top: 50px;
    bottom: 60px;
  }
`;

export const Sidebar = styled.nav<{ theme: any }>`
  background-color: ${props => props.theme.sidebar};
  border-right: 1px solid ${props => props.theme.border};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const SidebarTitle = styled.h1<{ theme: any }>`
  font-size: 1.5rem;
  color: ${props => props.theme.text};
  margin: 0;
`;

export const ThemeToggle = styled.button<{ theme: any }>`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1.25rem;

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

export const NavList = styled.div`
  padding: 1.5rem;
`;

export const NavItem = styled.div<{ active: boolean; theme: any; level: number }>`
  padding: 0.5rem;
  padding-left: ${props => `${(props.level) * 1.2}rem`};
  cursor: pointer;
  border-radius: 6px;
  background-color: ${props => props.active ? props.theme.hover : 'transparent'};
  color: ${props => props.active ? props.theme.primary : props.theme.text};
  font-size: ${props => props.level === 0 ? '1rem' : '0.95rem'};

  &:hover {
    background-color: ${props => props.theme.hover};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const NavItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ToggleButton = styled.button<{ isOpen: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${props => props.isOpen ? '90deg' : '0deg'});
  transition: transform 0.2s ease;

  &::before {
    content: '›';
    font-size: 1.2rem;
  }
`;

export const SubsectionContainer = styled.div<{ isOpen: boolean }>`
  height: ${props => props.isOpen ? 'auto' : '0'};
  overflow: hidden;
  transition: height 0.2s ease;
  margin-left: 0.5rem;
`;

export const DocContainer = styled.main<{ theme: any }>`
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.background};
`;

export const DocContent = styled.main<{ theme: any }>`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
  height: 100%;
  box-sizing: border-box;

  .list-container {
    margin: 1.5rem 0;
    padding: 1.5rem;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;
    counter-reset: list-counter;
  }

  .list-title {
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
  }

  .styled-list {
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      position: relative;
      padding-left: 2rem;
      margin-bottom: 0.75rem;
      color: #4a5568;
      line-height: 1.6;
      transition: all 0.2s ease-in-out;

      &::before {
        position: absolute;
        left: 0;
      }

      &:hover {
        transform: translateY(-1px);
      }
    }
  }

  .list-ordered > .styled-list > li::before {
    content: counter(list-counter) ".";
    counter-increment: list-counter;
    color: #4299e1;
    font-weight: 600;
  }

  .list-unordered > .styled-list > li::before {
    content: "•";
    color: #4299e1;
    font-size: 1.5em;
    line-height: 1;
    top: -0.125em;
  }

  .nested-list {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0 0;

    > li {
      position: relative;
      padding-left: 1.5rem;
      margin: 0.4rem 0;
      color: #718096;
      font-size: 0.95rem;

      &::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #a0aec0;
        font-size: 1.2em;
        line-height: 1;
        top: -0.125em;
      }
    }
  }

  @media (max-width: 1024px) {
    padding: 1rem;
    
    > div {
      max-width: 100%;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    
    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
`;

export const TableOfContents = styled.aside<{ theme: any }>`
  background-color: ${props => props.theme.sidebar};
  border-left: 1px solid ${props => props.theme.border};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 1.5rem;

  @media (max-width: 1024px) {
    display: none;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: ${props => props.theme.text};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0.5rem 0;

    a {
      color: ${props => props.theme.text};
      text-decoration: none;
      font-size: 0.95rem;
      opacity: 0.8;
      transition: all 0.2s ease;
      display: block;
      padding: 0.5rem;
      border-radius: 6px;

      &:hover {
        opacity: 1;
        color: ${props => props.theme.primary};
        background-color: ${props => props.theme.hover};
      }

      &.active {
        color: ${props => props.theme.primary};
        font-weight: 600;
        opacity: 1;
        background-color: ${props => props.theme.hover};
      }
    }

    &.h1 a { padding-left: 0.5rem; }
    &.h2 a { padding-left: 1.2rem; }
    &.h3 a { padding-left: 1.9rem; }
  }
`;

export const LoadingMessage = styled.div<{ theme: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
`;

export const MarkdownHeading1 = styled.h1<{ theme: any }>`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  color: ${props => props.theme.text};
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.theme.primary};
  line-height: 1.2;
  width: 100%;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal;

  @media (max-width: 1024px) {
    margin: 1.5rem 0 1rem;
    font-size: 1.8rem;
  }
`;

export const MarkdownHeading2 = styled.h2<{ theme: any }>`
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  font-weight: 600;
  color: ${props => props.theme.text};
  margin: 2rem 0 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid ${props => props.theme.border};
  line-height: 1.3;
  width: 100%;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal;

  @media (max-width: 1024px) {
    margin: 1.2rem 0 0.8rem;
    font-size: 1.4rem;
  }
`;

export const MarkdownHeading3 = styled.h3<{ theme: any }>`
  font-size: clamp(1.2rem, 3.5vw, 1.4rem);
  font-weight: 600;
  color: ${props => props.theme.text};
  margin: 1.5rem 0 1rem;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal;

  @media (max-width: 1024px) {
    margin: 1rem 0 0.8rem;
    font-size: 1.2rem;
  }
`;

// Add new mobile navigation components
export const MobileNav = styled.div<{ theme: any }>`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: ${props => props.theme.background};
    border-top: 1px solid ${props => props.theme.border};
    padding: 0 1rem;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const MobileNavButton = styled.button<{ theme: any }>`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  svg {
    font-size: 1.25rem;
  }

  span {
    font-size: 0.75rem;
  }

  &:hover {
    color: ${props => props.theme.primary};
  }

  &.active {
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.hover};
  }
`;

export const MobileNavHeader = styled.div<{ theme: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.background};

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.text};
  }
`;

export const MobileCloseButton = styled.button<{ theme: any }>`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;

  &:hover {
    background-color: ${props => props.theme.hover};
  }
`;

export const MobileOverlay = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 1024px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 98;
  }
`;

export const MobileSidebar = styled.div<{ theme: any; isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 60px;
  width: 100%;
  background-color: ${props => props.theme.background};
  z-index: 99;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: block;
    width: 75%;
    max-width: 360px;
    border-right: 1px solid ${props => props.theme.border};
  }
`;

export const MobileToc = styled.div<{ theme: any; isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 50px;
  right: 0;
  bottom: 60px;
  width: 100%;
  background-color: ${props => props.theme.background};
  z-index: 99;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: block;
    width: 75%;
    max-width: 360px;
    border-left: 1px solid ${props => props.theme.border};
  }
`; 
