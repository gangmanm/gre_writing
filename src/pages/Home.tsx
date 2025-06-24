import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem 0;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #0070f3;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0051cc;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to GRE Writing Guide</Title>
      <Description>
        Master the GRE Writing section with our comprehensive guide and practice resources.
        Learn strategies, tips, and techniques to improve your writing skills.
      </Description>
      <CTAButton to="/">Get Started</CTAButton>
    </HomeContainer>
  );
};

export default Home; 