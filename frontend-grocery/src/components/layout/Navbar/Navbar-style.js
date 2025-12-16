// src/components/layout/Navbar/Navbar-style.js

import styled from "styled-components";

export const NavContainer = styled.header`
  background-color: var(--color-white);
  box-shadow: var(--shadow-medium);
  padding: 0 5%;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

export const Logo = styled.div`
  a {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--color-primary);
  }

  span {
    color: var(--color-text-dark);
    margin-left: 5px;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: var(--color-white);
    box-shadow: var(--shadow-medium);
    padding: 15px 5%;

    ${(props) => props.$isOpen && `display: flex;`}
  }
`;

export const NavItem = styled.div`
  position: relative; /* For badge positioning */

  a,
  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    color: var(--color-text-dark);
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.2s, background-color 0.2s;
    border-radius: var(--border-radius);
  }

  a:hover,
  button:hover {
    color: var(--color-primary);
    background-color: #fff0e6;
  }

  button {
    background-color: transparent;
    border: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  font-size: 1.5rem;
  color: var(--color-text-dark);
  padding: 5px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--color-primary);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  height: 18px;
  min-width: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  transform: translate(25%, -25%);
`;
