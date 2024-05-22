import styled from "styled-components";

interface IntroProps {
  image: string;
  alt: string;
  title: string;
  text: string;
}

const Intro: React.FC<IntroProps> = ({ image, alt, title, text }) => (
  <IntroWrapper>
    <Image src={image} alt={alt}></Image>
    <StyledParagraph>
      <StyledSpan>{title}</StyledSpan>
      {text}
    </StyledParagraph>
  </IntroWrapper>
);

export default Intro;

const IntroWrapper = styled.div`
  margin-top: 1em;
`;

const Image = styled.img``;

const StyledSpan = styled.span`
  font-weight: 700;
`;

const StyledParagraph = styled.p`
  margin: 0;
  padding: 0.5em 2em 0 2em;
  font-size: 1.1rem;
  line-height: 1.4;
`;
