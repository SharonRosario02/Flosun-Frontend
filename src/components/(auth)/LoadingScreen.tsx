// components/LoadingScreen.tsx
import styled from "styled-components";

const LoadingScreen: React.FC = () => (
  <StyledLoadingScreen>
    <h1>Loading...</h1>
  </StyledLoadingScreen>
);

export default LoadingScreen;

const StyledLoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
`;