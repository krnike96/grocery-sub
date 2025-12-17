import styled from "styled-components";
import { PrimaryButton } from "../../auth/Login/Login-style";

export const CheckoutContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-text-dark);
  margin-bottom: 25px;
  border-bottom: 3px solid var(--color-primary);
  display: inline-block;
  padding-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
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
  height: fit-content;

  @media (max-width: 992px) {
    order: -1;
  }
`;

export const SectionHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--color-primary-dark);
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
`;

export const AddressForm = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 30px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: ${(props) => (props.disabled ? "#eee" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(252, 128, 25, 0.2);
  }
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
  font-size: ${(props) => (props.$total ? "1.2rem" : "1rem")};

  span.value {
    font-weight: 700;
  }
`;

export const CheckoutButton = styled(PrimaryButton)`
  margin-top: 20px;
  padding: 15px;
  font-size: 1.1rem;
  width: 100%;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
