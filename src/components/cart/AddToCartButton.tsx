import { useState, useContext, useRef } from "react";
import { AppContext } from "../../appContext";
import styled from "styled-components";

interface AddToCartButtonProps {
  id: string | number | undefined;
  _id: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ id, _id }) => {
  const context = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const minusRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const minus = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      context?.minus(Number(id), _id, quantity);
    }
  };

  const plus = () => {
    setQuantity((prev) => prev + 1);
    context?.plus(Number(id), _id);
  };

  return (
    <StyledContainer>
      <QuantityWrapper>
        <QuantityButton
          ref={minusRef}
          onClick={minus}
          disabled={context?.cart?.some((obj) => obj.id === id)}
        >
          −
        </QuantityButton>
        <QuantityValue>{quantity}</QuantityValue>
        <QuantityButton
          onClick={plus}
          disabled={context?.cart?.some((obj) => obj.id === id)}
        >
          +
        </QuantityButton>
      </QuantityWrapper>
      <AddToCardButton
        ref={buttonRef}
        onClick={() =>
          context?.addToCart(
            Number(id),
            _id,
            Number(quantity),
            Number(context?.allItems?.filter((item) => item.id === id)[0].price)
          )
        }
        disabled={context?.cart?.some((obj) => obj.id === id)}
      >
        {context?.cart?.some((obj) => obj.id === id)
          ? "Item Added"
          : "Add to Cart"}
      </AddToCardButton>
    </StyledContainer>
  );
};

export default AddToCartButton;

// ... (styled components remain the same)

const StyledContainer = styled.div`
  display: flex;
  margin-top: 1em;
  width: 100%;
  max-width: 400px;
`;

const QuantityWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${({ theme }) => theme.colors.accentDark};
  min-height: 2.4em;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
`;

const QuantityButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 1rem;
`;

const QuantityValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

// const AddToCardButton = styled.button`
//   flex: 3;
//   transition: all 0.2s;
//   border: none;
//   padding: 0.2em 0;
//   background-color: ${({ theme }) => theme.colors.accentDark};
//   font-family: inherit;
//   font-size: 1rem;
//   color: ${({ theme }) => theme.colors.white};
//   font-weight: 500;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.accentGreen};
//     cursor: pointer;
//   }

//   &:disabled {
//     background-color: ${({ theme }) => theme.colors.accentGrey};
//     cursor: default;
//   }
// `;

const AddToCardButton = styled.button`
  flex: 3;
  transition: all 0.2s;
  border: none;
  padding: 0.2em 0;
  background-color: #9b59b6;
  font-family: inherit;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 500;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: all 0.5s;
    transform: skewX(-20deg);
  }

  &:hover {
    background-color: #8e44ad;
    cursor: pointer;

    &:before {
      left: 100%;
    }
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: default;

    &:before {
      display: none;
    }
  }
`;