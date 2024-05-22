import styled from "styled-components";
import { Link } from "react-router-dom";
import Img4 from "../../img/beginner-plants.webp";
import Button from "./Button";
import { RouteNames } from "../../types/RouteNames";
import { devices } from "../../styles/theme";
import { SectionHeading } from "../../pages/Home";

const BeginnerSection: React.FC = () => (
  <IntroContainer>
    <StyledImage src={Img4} alt="Almost unkillable houseplants" />
    <IntroWrapper>
      <SectionHeading>(Almost) unkillable houseplants</SectionHeading>
      <StyledParagraph>
        We know what it’s like to be guilty of plant murder, we've pulled
        together a collection of plants who are low maintenance enough to
        forgive you for the odd missed watering.
      </StyledParagraph>
      <Link
        to={`./${RouteNames.SHOP + "/" + RouteNames.FOR_BEGINNERS_QUERY}`}
        aria-label="Shop for beginner plants"
      >
        <Button>Shop the collection</Button>
      </Link>
    </IntroWrapper>
  </IntroContainer>
);

export default BeginnerSection;

export const IntroContainer = styled.div`
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.accentDark};

  @media ${devices.tabletS} {
    display: flex;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.sizes.containerL};
  }
`;

export const StyledImage = styled.img`
  height: 14em;
  width: 100%;
  object-fit: cover;

  @media ${devices.tabletS} {
    flex: 1;
    height: 31em;
    width: 50%;
    order: 2;
  }
`;

export const IntroWrapper = styled.div`
  padding: 0.5em 1em;
  text-align: center;

  @media ${devices.tabletS} {
    padding: 5em 2em 2em 2em;
    width: 50%;
    text-align: end;
  }
`;

export const StyledParagraph = styled.p`
  margin: 0 0 1em 0;
  font-size: 1.1rem;
  line-height: 1.4;
`;
