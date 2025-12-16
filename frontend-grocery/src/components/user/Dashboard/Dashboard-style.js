// src/components/user/Dashboard/Dashboard-style.js

import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 0;
`;

// --- Hero & Offers Section ---
export const HeroSection = styled.div`
  background: #171a29;
  color: white;
  padding: 40px;
  border-radius: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 24px;
  }
`;

export const HeroText = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #fff;
  }
  p {
    color: #a9abb3;
    font-size: 1.1rem;
  }
  strong {
    color: var(--color-primary);
  }
`;

// --- Categories Grid ---
export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #282c3f;
  margin-bottom: 24px;
  border-bottom: 3px solid var(--color-primary);
  display: inline-block;
  padding-bottom: 5px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

export const CategoryCard = styled.div`
  cursor: pointer;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow-light);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  h3 {
    font-size: 1.2rem;
    color: #3d4152;
    margin: 15px;
  }

  p {
    font-size: 0.9rem;
    color: #7e808c;
    margin: 0 15px 15px;
  }
`;

// --- Product Listing & Buttons ---
export const BackButton = styled.button`
  background: white;
  border: 1px solid #d4d5d9;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #fff0e6;
    border-color: var(--color-primary);
  }
`;

export const ProductCard = styled.div`
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  overflow: hidden;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-medium);
  }

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
`;

export const ProductInfo = styled.div`
  padding: 15px;
  flex: 1;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 5px;
    color: #3d4152;
  }
  .price {
    font-size: 1.2rem;
    color: #282c3f;
    font-weight: 700;
  }
  .unit {
    font-size: 0.85rem;
    color: #999;
    font-weight: 400;
    margin-left: 5px;
  }
`;

export const ActionButtons = styled.div`
  padding: 15px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;
  }

  .add-btn {
    background: white;
    border: 1px solid #60b246; /* Green for add */
    color: #60b246;
    &:hover {
      background: #f0fff4;
    }
  }

  .sub-btn {
    background: #fff5e6; /* Light orange */
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    &:hover {
      background: #ffe0cc;
    }
  }
`;

// --- Footer ---
export const FooterInfo = styled.div`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #e9e9eb;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;

  h4 {
    color: #3d4152;
    margin-bottom: 16px;
  }

  p {
    color: #7e808c;
    font-size: 14px;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
      color: var(--color-primary);
    }
  }
`;
