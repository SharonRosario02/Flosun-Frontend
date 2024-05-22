import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Icon } from "@mdi/react";
import { mdiCartOutline, mdiHeart } from "@mdi/js";
import { RouteNames } from "../../types/RouteNames";
import { useContext, useRef } from "react";
import { AppContext } from "../../appContext";
import { HeaderProps } from "./Header";

const Icons: React.FC<HeaderProps> = ({ setCartOpened }) => {
  const context = useContext(AppContext);
  const cartIconRef = useRef<HTMLDivElement>(null);

  return (
    <IconWrapper>
      <StyledNavLink
        to={RouteNames.HOME + RouteNames.FAVORITE}
        aria-label="Favorite plants"
      >
        <StyledIcon path={mdiHeart} className="heart-icon" />
      </StyledNavLink>
      <CartIconWrapper
        ref={cartIconRef}
        onClick={() => setCartOpened((prev) => !prev)}
      >
        {Number(context?.cart?.length) > 0 && (
          <QuantityLabel onClick={() => setCartOpened((prev) => !prev)}>
            {context?.cart?.length}
          </QuantityLabel>
        )}
        <StyledIcon path={mdiCartOutline} />
      </CartIconWrapper>
    </IconWrapper>
  );
};

export default Icons;

const IconWrapper = styled.div`
  display: flex;
  gap: 1em;
  margin-left: 0 0.8em 0 1em;
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    .heart-icon {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const StyledIcon = styled(Icon)`
  height: 1.75rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.darkGrey};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const CartIconWrapper = styled.div`
  position: relative;
  margin-right: 1em;
`;

const QuantityLabel = styled.div`
  position: absolute;
  right: -8px;
  top: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5em;
  min-height: 1.5em;
  min-width: 1.5em;
  background-color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.white};
`;
