import styled from "styled-components";
import { devices } from "../styles/theme";

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledList>
      <ListItemFAQ>FAQ</ListItemFAQ>
      <ListItem>Terms of Service</ListItem>
      <ListItem>Privacy Policy</ListItem>
      <ListItem>Returns and Delivery</ListItem>
      <ListItem>Contact</ListItem>
    </StyledList>
  </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 4em;
  padding-bottom: 1em;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textGrey};
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  margin: 0 0 1em 0;
  padding: 0;
  list-style: none;

  @media ${devices.tabletXS} {
    flex-direction: row;
    gap: 1em;
  }
`;

const ListItem = styled.li`
  @media ${devices.tabletXS} {
    border-left: 1px solid ${({ theme }) => theme.colors.textGrey};
    padding-left: 1em;
    cursor: pointer;
  }
`;

const ListItemFAQ = styled(ListItem)`
  @media ${devices.tabletXS} {
    border: none;
    padding-left: 0;
  }
`;
