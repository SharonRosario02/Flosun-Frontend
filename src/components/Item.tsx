import { useContext, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@mdi/react";
import { mdiHeartOutline, mdiHeart } from "@mdi/js";
import { AppContext } from "../appContext";
import AddToCartButton from "./cart/AddToCartButton";
import styled from "styled-components";
import { devices } from "../styles/theme";
import { RouteNames } from "../types/RouteNames";

interface plantDataProps {
  plantData: {
    id: number;
    name: string;
    price: number;
    img: string;
    description: string;
    isFavorite: boolean;
    forBeginners: boolean;
    isPetSafe: boolean;
  };
}

const Item: React.FC<plantDataProps> = ({ plantData }) => {
  const context = useContext(AppContext);

  const setFavorite = (e: SyntheticEvent) => {
    e.stopPropagation();
    context?.toggleFavorite(plantData.id);
  };

  return (
    <ItemCard>
      <HeartIconWrapper onClick={setFavorite}>
        {plantData.isFavorite ? (
          <StyledIcon path={mdiHeart} size={1} />
        ) : (
          <StyledIcon path={mdiHeartOutline} size={1} />
        )}
      </HeartIconWrapper>
      <StyledLink
        to={`${RouteNames.HOME + RouteNames.SHOP}/${plantData.id}`}
        aria-label="Plant details"
      >
        <StyledImage src={plantData.img} alt="Plant image" />
      </StyledLink>
      <ItemInfo>
        <StyledLink
          to={`${RouteNames.HOME + RouteNames.SHOP}/${plantData.id}`}
          aria-label="Plant details"
        >
          <ItemName>{plantData.name}</ItemName>
        </StyledLink>
        <ItemPrice>€{plantData.price}.00</ItemPrice>
        <AddToCartButton id={plantData.id} />
      </ItemInfo>
    </ItemCard>
  );
};

export default Item;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 0.0625rem solid ${({ theme }) => theme.colors.borderColor};
  margin: 0 auto;
  width: 100%;
  min-width: 160px;
  max-width: 250px;

  @media ${devices.mobileS} {
    width: 80%;
  }
`;

const HeartIconWrapper = styled.div`
  z-index: 2;
  position: relative;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  left: 0.2em;
  top: 0.2em;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.red};
`;

const ItemInfo = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5em;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.accentDark};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledImage = styled.img`
  user-select: none;
  width: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const ItemName = styled.div`
  margin-bottom: 0.3em;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.accentGreen};
  font-weight: 600;
  text-decoration: none;
`;

const ItemPrice = styled.div`
  font-size: 1rem;
`;
