import styled from "styled-components";
import { mdiTrashCanOutline } from "@mdi/js";
import { useContext, useRef } from "react";
import { AppContext } from "../../appContext";
import { Icon } from "@mdi/react";
import { CartType } from "../../appContext";
import { devices } from "../../styles/theme";

interface CartProps {
  cartItem: CartType;
}

const CartItem: React.FC<CartProps> = ({ cartItem }) => {
  const context = useContext(AppContext);
  const minusRef = useRef<HTMLButtonElement>(null);

  const calculatePrice = () => {
    let total = 0;
    const price = context?.allItems?.filter((obj) => obj.id === cartItem.id)[0]
      .price;
    if (price) {
      total = price * cartItem.quantity;
    }
    return `€${total}.00`;
  };

  return (
    <ItemContainer>
      <IconWrapper onClick={() => context?.removeItem(cartItem.id)}>
        <StyledIcon path={mdiTrashCanOutline} />
      </IconWrapper>
      <StyledImage
        src={context?.allItems?.filter((obj) => obj.id === cartItem.id)[0].img}
        alt="Plant image"
      />
      <ItemDetails>
        <ItemName>
          {context?.allItems?.filter((obj) => obj.id === cartItem.id)[0].name}
        </ItemName>
        <ItemHeading>{calculatePrice()}</ItemHeading>
        <QuantityWrapper>
          <QuantityButton
            ref={minusRef}
            onClick={() => context?.minus(cartItem.id, cartItem.quantity)}
          >
            −
          </QuantityButton>
          <QuantityValue>{cartItem.quantity}</QuantityValue>
          <QuantityButton onClick={() => context?.plus(cartItem.id)}>
            +
          </QuantityButton>
        </QuantityWrapper>
      </ItemDetails>
    </ItemContainer>
  );
};

export default CartItem;

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.5em;
  border-top: 1px solid ${({ theme }) => theme.colors.darkGrey};
  padding: 1em 1em;
`;

const IconWrapper = styled.div``;

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 1.2em;
  width: 1.2em;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.hoverRed};
  }
`;

const StyledImage = styled.img`
  max-width: 30%;
  object-fit: cover;

  @media ${devices.mobileXS} {
    display: none;
  }
`;

const ItemDetails = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  @media ${devices.mobileXS} {
    margin-top: 1.4em;
  }
`;

const ItemHeading = styled.h4`
  margin: 0 0 1em 0;
  font-weight: 500;

  @media ${devices.mobileXS} {
    margin-bottom: 0.4em;
  }
`;

const ItemName = styled(ItemHeading)`
  font-weight: 700;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${({ theme }) => theme.colors.accentDark};
  margin-top: auto;
  min-height: 2em;
  width: 5em;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
`;

const QuantityButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const QuantityValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
