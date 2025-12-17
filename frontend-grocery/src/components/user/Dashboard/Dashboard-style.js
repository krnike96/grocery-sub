import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// --- Tab Navigation ---
export const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
`;

export const TabButton = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: ${(props) => (props.$active ? "#60b246" : "#f4f4f4")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  cursor: pointer;
  font-weight: 600;
  display: flex;
  alignitems: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#529a3c" : "#e8e8e8")};
  }
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
    font-size: 2.2rem;
    margin-bottom: 10px;
    color: #fff;
  }
  p {
    color: #a9abb3;
    font-size: 1.1rem;
  }
  strong {
    color: #60b246;
  }
`;

// --- Categories & Titles ---
export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #282c3f;
  margin-bottom: 24px;
  display: inline-block;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 40px;
    height: 4px;
    background: #60b246;
    border-radius: 2px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

export const CategoryCard = styled.div`
  cursor: pointer;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  h3 {
    font-size: 1.1rem;
    color: #3d4152;
    margin: 15px 15px 5px;
  }

  p {
    font-size: 0.85rem;
    color: #7e808c;
    margin: 0 15px 15px;
  }
`;

// --- Product Listing & Buttons ---
export const BackButton = styled.button`
  background: white;
  border: 1px solid #d4d5d9;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #f8f9fa;
  }
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
`;

export const ProductInfo = styled.div`
  padding: 15px;
  flex: 1;

  h3 {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #3d4152;
  }
  .price {
    font-size: 1.1rem;
    color: #282c3f;
    font-weight: 700;
  }
`;

export const ActionButtons = styled.div`
  padding: 12px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.85rem;
  }

  .add-btn {
    background: white;
    border: 1px solid #60b246;
    color: #60b246;
    &:hover {
      background: #f0fff4;
    }
  }

  .sub-btn {
    background: #fff5e6;
    border: 1px solid #ff8200;
    color: #ff8200;
    &:hover {
      background: #ffe0cc;
    }
  }
`;
