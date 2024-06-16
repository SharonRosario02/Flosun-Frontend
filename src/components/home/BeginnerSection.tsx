import styled from "styled-components";
import { Link } from "react-router-dom";
import Img4 from "../../img/beginner-plants.webp";
import hero_image2 from "../../../public/Hero_images/hero_image2.webp"
import Button from "./Button";
import { RouteNames } from "../../types/RouteNames";
import { devices } from "../../styles/theme";
import { SectionHeading } from "../../pages/Home";

const BeginnerSection: React.FC = () => (
  <IntroContainer>
  <StyledImage src={hero_image2} alt="Beautiful flower bouquets" />
  <IntroWrapper>
    <SectionHeading>Exquisite Flower Bouquets</SectionHeading>
    <StyledParagraph>
      Discover our stunning collection of flower bouquets, perfect for any
      occasion. Handcrafted with love and care, our bouquets are designed to
      bring joy and beauty to your life.
    </StyledParagraph>
    {/* <Link
      to={`./${RouteNames.SHOP + "/" + RouteNames.FLOWER_BOUQUETS_QUERY}`}
      aria-label="Shop for flower bouquets"
    >
      <Button>Shop the collection</Button>
    </Link> */}\

<Link
  to="/bouquet-shop/shop"
  aria-label="Shop for pet-safe flower bouquets"
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
