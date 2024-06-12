import styled from "styled-components";
import { Link } from "react-router-dom";
import Img5 from "../../img/pet-friendly-plants.webp";
import petFree_image from "../../../public/Hero_images/petFree_image.jpg"
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
    <PetFriendlyStyledImage src={petFree_image} alt="Pet-safe flower bouquets" />
    <PetFriendlyIntroWrapper>
      <SectionHeading>Pet-safe Flower Bouquets</SectionHeading>
      <StyledParagraph>
        Enjoy beautiful flower bouquets without worrying about your pets. Our
        collection of pet-safe bouquets ensures that your furry friends remain
        happy and healthy.
      </StyledParagraph>
      <Link
  to="/plant-shop/shop"
  aria-label="Shop for pet-safe flower bouquets"
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
