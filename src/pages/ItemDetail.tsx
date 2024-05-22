import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import AddToCartButton from "../components/cart/AddToCartButton";
import styled from "styled-components";
import { devices } from "../styles/theme";

const ItemDetail: React.FC = () => {
  const [item, setItem] = useState({
    id: 0,
    name: "",
    price: 0,
    img: "",
    description: "",
    isFavorite: false,
    forBeginners: false,
    isPetSafe: false,
  });
  const context = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    context?.allItems.forEach((item) => {
      if (Number(item.id) === Number(id)) {
        setItem(item);
      }
    });
  }, [context?.cart]);

  return (
    <StyledContainer>
      <BackButton onClick={() => navigate(-1)}>&larr; Go Back</BackButton>
      <Content>
        <StyledImage src={item.img} alt="Plant image" />
        <InfoWrapper>
          <StyledHeading>{item.name}</StyledHeading>
          <PlantTypeLabels>
            {item.forBeginners && (
              <BeginnerFriendly>For beginners</BeginnerFriendly>
            )}
            {item.isPetSafe && <PetFriendly>Pet-friendly</PetFriendly>}
          </PlantTypeLabels>
          <Price>€{item.price}.00</Price>
          <Description>{item.description}</Description>
          <AddToCartButton id={item.id} />
        </InfoWrapper>
      </Content>
    </StyledContainer>
  );
};

export default ItemDetail;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.containerL};
`;

const BackButton = styled.button`
  border: none;
  margin: 2em 0 1em 1.5em;
  width: fit-content;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.2rem;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryGreen};
  }

  @media ${devices.tabletM} {
    margin-left: 4.5em;
  }
`;

const Content = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;

  @media ${devices.tabletM} {
    flex-direction: row;
    gap: 2em;
    padding: 2em;
  }
`;

const StyledImage = styled.img`
  max-width: 100%;

  @media ${devices.tabletM} {
    flex: 1;
    max-width: 50%;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;

  @media ${devices.tabletM} {
    flex: 1;
    align-self: flex-start;
  }
`;

const StyledHeading = styled.h1`
  margin-bottom: 0;
`;

const PlantTypeLabels = styled.div`
  display: flex;
  gap: 1em;
  margin-top: 0.5em;
  font-size: 0.9rem;

  @media ${devices.tabletM} {
    font-size: 0.8rem;
  }
`;

const BeginnerFriendly = styled.div`
  border-radius: 3px;
  padding: 0.2em 0.6em;
  background-color: ${({ theme }) => theme.colors.lightGreen};
`;

const PetFriendly = styled(BeginnerFriendly)`
  background-color: ${({ theme }) => theme.colors.lightOrange};
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  margin-top: 0.5em;
`;

const Description = styled.div`
  margin-top: 1em;
  font-size: 1.1rem;
  line-height: 1.4;
  text-align: justify;

  @media ${devices.tabletM} {
    font-weight: 300;
  }
`;
