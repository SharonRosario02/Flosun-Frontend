import { useEffect } from "react";
import Hero from "../components/home/Hero";
import ItemCarousel from "../components/home/ItemCarousel";
import Intro from "../components/home/Intro";
import BeginnerSection from "../components/home/BeginnerSection";
import PetFriendlySection from "../components/home/PetFriendlySection";
import { homeData } from "../data/homeData";
import styled from "styled-components";
import { devices } from "../styles/theme";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const shopIntroArray = homeData.map((obj, index) => (
    <Intro
      key={index}
      image={obj.image}
      alt={obj.alt}
      title={obj.title}
      text={obj.text}
    />
  ));

  return (
    <HomeContainer>
      <Hero />
      <SectionHeading>Best-Selling Houseplants</SectionHeading>
      <ItemCarousel />
      <WhyUsContainer>
        <WhyUsHeading>Why GetPlants?</WhyUsHeading>
        <ShopIntro>{shopIntroArray}</ShopIntro>
      </WhyUsContainer>
      <BeginnerSection />
      <PetFriendlySection />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div``;

export const SectionHeading = styled.h2`
  margin-top: 2em;
  font-size: 2.3rem;
  color: ${({ theme }) => theme.colors.primaryGreen};
  font-weight: 500;
  text-align: center;
`;

const WhyUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 0px;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.accentDark};
  text-align: center;
`;

const WhyUsHeading = styled(SectionHeading)`
  margin-top: 0;
`;

const ShopIntro = styled.div`
  @media ${devices.tabletXS} {
    display: flex;
    max-width: ${({ theme }) => theme.sizes.containerL};
  }
`;
