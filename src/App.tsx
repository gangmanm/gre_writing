import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import styled from '@emotion/styled';
import { FaBook, FaHome, FaFileAlt } from 'react-icons/fa';
import Home from './pages/Home';
import { Documentation } from './pages/Documentation';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const MainContent = styled.main`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding-top: 60px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding-top: 50px;
    padding-bottom: 60px;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid #eaeaea;
  width: 100%;
  min-height: 60px;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  @media (max-width: 1024px) {
    padding: 0 1rem;
    min-height: 50px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: 0.75rem 0;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;

  @media (max-width: 1024px) {
    padding: 0.5rem 0;
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  line-height: 1;

  svg {
    font-size: 1.5rem;
    color: #4F46E5;
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    font-size: 1.1rem;

    svg {
      font-size: 1.3rem;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4B5563;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.625rem 0.875rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  line-height: 1;
  
  svg {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  &:hover {
    color: #4F46E5;
    background-color: #F5F5F5;
  }

  &.active {
    color: #4F46E5;
    background-color: #F5F5F5;
  }
`;

function App() {
  return (
    <RecoilRoot>
      <Router basename="/gre_writing">
        <AppContainer>
          <Header>
            <LogoContainer>
              <Logo>
                <FaBook />
                지알이 마스터
              </Logo>
            </LogoContainer>
          </Header>
          <MainContent>
            <Routes>
              <Route path="/" element={<Documentation />} />
              <Route path="/:section" element={<Documentation />} />
              <Route path="/:section/:subsection" element={<Documentation />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </RecoilRoot>
  );
}

export default App;
