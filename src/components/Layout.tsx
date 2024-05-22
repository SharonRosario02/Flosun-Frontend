import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import Cart from "./cart/Cart";
import styled from "styled-components";
import bgImage from "../img/bgImage.jpeg"

const Layout: React.FC = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartOpened && overlayRef.current) {
      overlayRef.current.style.visibility = "visible";
      document.body.style.overflowY = "hidden";
    } else if (overlayRef.current) {
      overlayRef.current.style.visibility = "hidden";
      document.body.style.overflowY = "visible";
    }
  }, [cartOpened]);

  return (
    <>
      <StyledOverlay
        onClick={() => setCartOpened((prev) => !prev)}
        ref={overlayRef}
      ></StyledOverlay>
      <SiteWrapper>
        <Cart cartOpened={cartOpened} setCartOpened={setCartOpened} />
        <Header setCartOpened={setCartOpened} />
        <StyledMain>
          <Outlet />
        </StyledMain>
        <Footer />
      </SiteWrapper>
    </>
  );
};

export default Layout;

const StyledOverlay = styled.div`
  z-index: 1002;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.transparentBlack};
  visibility: "hidden";
`;

const SiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const StyledMain = styled.main`
  flex: 1;
`;

// import { useEffect, useState, useRef } from "react";
// import { Outlet } from "react-router-dom";
// import Header from "./header/Header";
// import Footer from "./Footer";
// import Cart from "./cart/Cart";
// import styled from "styled-components";
// import bgImage from "../img/bgImage.jpeg"

// const Layout: React.FC = () => {
//   const [cartOpened, setCartOpened] = useState(false);
//   const overlayRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (cartOpened && overlayRef.current) {
//       overlayRef.current.style.visibility = "visible";
//       document.body.style.overflowY = "hidden";
//     } else if (overlayRef.current) {
//       overlayRef.current.style.visibility = "hidden";
//       document.body.style.overflowY = "visible";
//     }
//   }, [cartOpened]);

//   return (
//     <>
//       <StyledOverlay onClick={() => setCartOpened((prev) => !prev)} ref={overlayRef}></StyledOverlay>
//       <SiteWrapper>
//         <Cart cartOpened={cartOpened} setCartOpened={setCartOpened} />
//         <Header setCartOpened={setCartOpened} />
//         <StyledMain>
//           <Outlet />
//         </StyledMain>
//         <Footer />
//       </SiteWrapper>
//     </>
//   );
// };

// export default Layout;

// const StyledOverlay = styled.div`
//   z-index: 1002;
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   background-color: ${({ theme }) => theme.colors.transparentBlack};
//   visibility: "hidden";
// `;

// const SiteWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   min-height: 100vh;
//   background-image: url(${bgImage}) !important;
//   background-size: cover !important;
//   background-position: center !important;
//   background-repeat: no-repeat !important;
// `;

// const StyledMain = styled.main`
//   flex: 1;
// `;