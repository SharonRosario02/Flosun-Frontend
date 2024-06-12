import styled from "styled-components";
import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../appContext";
import Item from "../components/Item";
import { devices } from "../styles/theme";
import { RouteNames } from "../types/RouteNames";

const Shop: React.FC = () => {
  const context = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const forBeginnersFilter = searchParams.get("forBeginners");
  const petSafeFilter = searchParams.get("isPetSafe");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const filterItems = () => {
    if (forBeginnersFilter) {
      return context?.allItems.filter((item) => item.forBeginners);
    } else if (petSafeFilter) {
      return context?.allItems.filter((item) => item.isPetSafe);
    }
    return context?.allItems;
  };

  const displayItems = filterItems()?.map((item) => (
    <Wrapper key={item.id}>
      <Item plantData={item} />
    </Wrapper>
  ));

  return (
    <ShopContainer>
      {/* <ButtonWrapper>
        {forBeginnersFilter || petSafeFilter ? (
          <StyledLink to=".">All</StyledLink>
        ) : (
          <SelectedLink to=".">All</SelectedLink>
        )}
        {forBeginnersFilter ? (
          <SelectedLink to={RouteNames.FOR_BEGINNERS_QUERY}>
            For Beginners
          </SelectedLink>
        ) : (
          <StyledLink to={RouteNames.FOR_BEGINNERS_QUERY}>
            For Beginners
          </StyledLink>
        )}
        {petSafeFilter ? (
          <SelectedLink to={RouteNames.PET_SAFE_QUERY}>
            Pet-Friendly
          </SelectedLink>
        ) : (
          <StyledLink to={RouteNames.PET_SAFE_QUERY}>Pet-Friendly</StyledLink>
        )}
      </ButtonWrapper> */}
      <ItemWrapper>{displayItems}</ItemWrapper>
    </ShopContainer>
  );
};

export default Shop;

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em auto 4em auto;
  max-width: 1200px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1em;
  margin-bottom: 2em;

  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 0.3em;
  }
`;

const StyledLink = styled(Link)`
  border: 1px solid #9b59b6;
  padding: 0.2em 0.9em;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  color: #9b59b6;
  font-weight: 300;
  text-decoration: none;
  text-align: center;

  &:hover {
    border-color: #8e44ad;
    background-color: #8e44ad;
    color: #ffffff;
  }
`;

const SelectedLink = styled(StyledLink)`
  border: 1px solid #8e44ad;
  background-color: #8e44ad;
  color: #ffffff;
`;

const Wrapper = styled.div`
  width: clamp(160px, 20%, 40%);

  @media ${devices.mobileS} {
    width: 90%;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  align-items: center;
  justify-content: center;

  @media ${devices.mobileM} {
    gap: 1em;
  }
`;