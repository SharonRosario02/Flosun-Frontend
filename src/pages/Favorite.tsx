import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AppContext } from "../appContext";
import Item from "../components/Item";

const Favorite: React.FC = () => {
  const context = useContext(AppContext);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const displayItems = context?.allItems
    .filter((item) => item.isFavorite)
    .map((item) => <Item key={item.id} plantData={item} />);

  return (
    <FavoritesContainer>
      {displayItems && displayItems.length > 0 ? (
        <StyledHeading>Your Favorite Flowers</StyledHeading>
      ) : (
        <StyledHeading>No Favorite Flowers &#128533;</StyledHeading>
      )}
      <FavoritesList>{displayItems}</FavoritesList>
    </FavoritesContainer>
  );
};

export default Favorite;

const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em auto 4em auto;
  max-width: ${({ theme }) => theme.sizes.containerL};
`;

const StyledHeading = styled.h3`
  margin: 0;
  font-size: 2.3rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryGreen};
  text-align: center;
`;

const FavoritesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2em;
  margin-top: 2em;
`;
