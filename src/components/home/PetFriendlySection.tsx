import styled from "styled-components";
import { Link } from "react-router-dom";
import Img5 from "../../img/pet-friendly-plants.webp";
import Button from "./Button";
import { RouteNames } from "../../types/RouteNames";
import { devices } from "../../styles/theme";
import {
  IntroContainer,
  StyledImage,
  IntroWrapper,
  StyledParagraph,
} from "./BeginnerSection";
import { SectionHeading } from "../../pages/Home";

const PetFriendlySection: React.FC = () => (
  <PetFriendlyIntroContainer>
    <PetFriendlyStyledImage src={Img5} alt="Pet-safe houseplants" />
    <PetFriendlyIntroWrapper>
      <SectionHeading>Pet-safe houseplants</SectionHeading>
      <StyledParagraph>
        It is possible for pets and plants to coexist in the same home. Keep
        your four-legged friends happy, healthy and out of harm’s way with cat
        and dog-safe houseplants.
      </StyledParagraph>
      <Link
        to={`./${RouteNames.SHOP + "/" + RouteNames.PET_SAFE_QUERY}`}
        aria-label="Shop for pet-safe plants"
      >
        <Button>Shop the collection</Button>
      </Link>
    </PetFriendlyIntroWrapper>
  </PetFriendlyIntroContainer>
);

export default PetFriendlySection;

const PetFriendlyIntroContainer = styled(IntroContainer)`
  @media ${devices.tabletS} {
    margin: 0 auto 3em;
  }
`;

const PetFriendlyStyledImage = styled(StyledImage)`
  @media ${devices.tabletS} {
    order: 0;
  }
`;

const PetFriendlyIntroWrapper = styled(IntroWrapper)`
  @media ${devices.tabletS} {
    text-align: left;
  }
`;
