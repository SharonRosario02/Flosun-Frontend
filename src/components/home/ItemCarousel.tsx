import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useContext } from "react";
import { AppContext } from "../../appContext";
import Item from "../Item";
import styled from "styled-components";

const ItemCarousel: React.FC = () => {
  const context = useContext(AppContext);

  const displayItems = context?.allItems.slice(0, 10).map((item) => (
    <Card key={item.id}>
      <Item plantData={item} />
    </Card>
  ));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1000 },
      items: 5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1000, min: 500 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 2,
      centerMode: true,
    },
    mobileS: {
      breakpoint: { max: 360, min: 0 },
      items: 1,
      centerMode: true,
    },
  };
  return (
    <StyledCarousel responsive={responsive} infinite={true}>
      {displayItems}
    </StyledCarousel>
  );
};

export default ItemCarousel;

const Card = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 1em;
  min-width: fit-content;
  overflow: hidden;
`;

const StyledCarousel = styled(Carousel)`
  margin: 2em auto;
  max-width: ${({ theme }) => theme.sizes.containerXL};
`;
