import styled from "styled-components";
import { PrimaryButton } from "../../auth/Login/Login-style"; // Reusing the primary button style

export const CheckoutContainer = styled.div`
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-text-dark);
  margin-bottom: 25px;
  border-bottom: 3px solid var(--color-primary);
  display: inline-block;
  padding-bottom: 5px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const CartDetails = styled.div`
  flex: 3;
`;

export const SummaryCard = styled.div`
  flex: 1.5;
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  padding: 25px;
  height: fit-content; /* Ensure it doesn't stretch */

  @media (max-width: 992px) {
    order: -1; /* Move summary to the top on mobile */
  }
`;

export const SectionHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--color-primary-dark);
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemInfo = styled.div`
  h4 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--color-text-dark);
  }

  p {
    margin: 5px 0 0 0;
    font-size: 0.9rem;
    color: ${(props) =>
      props.$isSub ? "var(--color-primary)" : "var(--color-text-light)"};
    font-weight: ${(props) => (props.$isSub ? "600" : "400")};
  }
`;

export const ItemPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-dark);
`;

export const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 1rem;
  font-weight: ${(props) => (props.$total ? "700" : "400")};
  color: ${(props) =>
    props.$total ? "var(--color-primary-dark)" : "var(--color-text-dark)"};

  span.value {
    font-weight: 700;
  }
`;

export const CheckoutButton = styled(PrimaryButton)`
  margin-top: 20px;
  padding: 15px;
  font-size: 1.1rem;
`;
