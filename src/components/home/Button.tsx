import styled from "styled-components";

interface ButtonProps {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children }) => (
  <StyledButton>{children}</StyledButton>
);

export default Button;

const StyledButton = styled.button`
  border: none;
  margin-bottom: 1em;
  padding: 0.6em 2em;
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-family: inherit;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryGreen};
  }
`;
