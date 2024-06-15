import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../styles/theme";
import { RouteNames } from "../../types/RouteNames";
import { useState, useEffect, useRef } from "react";

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { email } = JSON.parse(user);
      const adminEmail = "admin@gmail.com";
      const isAdminUser = email === adminEmail;
      setIsAdmin(isAdminUser);
  
      if (isAdminUser) {
        navigate(`${RouteNames.HOME}${RouteNames.ADMIN_DASHBOARD}`, { replace: true });
      }
    }
  }, []);


  const handleLogout = () => {
    // Remove user and token from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Navigate to the relative path with replace option
    navigate('/plant-shop/login', { replace: true });
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      setShowLogoutDialog(false);
    }
  };

  useEffect(() => {
    if (showLogoutDialog) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showLogoutDialog]);

  return (
    <StyledNav>
      {isAdmin ? (
        <>
          {/* Admin pages */}
          <StyledNavLink to='admin-dashboard'>Dashboard</StyledNavLink>
          <StyledNavLink to='admin-products'>Products</StyledNavLink>
          <StyledNavLink to='admin-feedbacks'>Feedbacks</StyledNavLink>
          <StyledNavLink to='admin-orders'>All Orders</StyledNavLink>
        </>
      ) : (
        <>
          {/* User pages */}
          <StyledNavLink to={RouteNames.HOME}>Home</StyledNavLink>
          <StyledNavLink to={RouteNames.HOME + RouteNames.SHOP}>Shop</StyledNavLink>
          <StyledNavLink to='orders'>My Orders</StyledNavLink>
          <StyledNavLink to='feedback'>Feedback</StyledNavLink>
          <StyledNavLink to='about-us'>About us</StyledNavLink>
          <StyledNavLink to='reminder'>Reminder</StyledNavLink>
        </>
      )}

      {/* Logout button */}
      <StyledNavLink as="button" onClick={handleLogoutClick}>
        Logout
      </StyledNavLink>

      {/* Logout dialog */}
      {showLogoutDialog && (
        <>
          <StyledOverlay />
          <StyledLogoutDialog ref={dialogRef}>
            <h3>Logout Confirmation</h3>
            <p>Are you sure you want to logout?</p>
            <div>
              <StyledButton onClick={handleLogout} backgroundColor="#4caf50">
                Yes
              </StyledButton>
              <StyledButton onClick={handleCancelLogout} backgroundColor="#f44336">
                Cancel
              </StyledButton>
            </div>
          </StyledLogoutDialog>
        </>
      )}
    </StyledNav>
  );
};

export default Nav;


const StyledNav = styled.nav`
  display: flex;
  gap: 2em;

  @media ${devices.mobileL} {
    gap: 1.2em;
  }

  @media ${devices.mobileS} {
    gap: 2em;
  }
`;

const StyledNavLink = styled(NavLink)`
  position: relative;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.grey};
  text-decoration: none;

  &.active {
    color: ${({ theme }) => theme.colors.black};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.black};
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(5px);
`;

const StyledLogoutDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  text-align: center;
  // width: 400px;
  // height: 200px;

  h3 {
    color: black;
  }

  p {
    color: black;
  }
`;

const StyledButton = styled.button<{ backgroundColor: string }>`
  margin: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
  cursor: pointer;
`;