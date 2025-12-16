import styled from "styled-components";

export const DeliveryContainer = styled.div`
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

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const OrderCard = styled.div`
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const OrderDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 250px;
`;

export const DetailItem = styled.p`
  font-size: 1rem;
  color: var(--color-text-dark);

  span {
    font-weight: 600;
    // color: var(--color-primary-dark);
    color: black;
  }
`;

export const OrderStatus = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: capitalize;
  background-color: ${(props) => {
    switch (props.$status) {
      case "delivered":
        return "var(--color-success)";
      case "transit":
        return "var(--color-primary)";
      case "assigned":
      default:
        return "#ffc107"; /* Yellow for assigned */
    }
  }};
  color: ${(props) =>
    props.$status === "assigned"
      ? "var(--color-text-dark)"
      : "var(--color-white)"};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

export const StatusButton = styled.button`
  padding: 8px 15px;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: background-color 0.2s;

  /* Green for Complete/Delivered */
  &.complete {
    background-color: var(--color-success);
    color: var(--color-white);
    &:hover {
      background-color: #1e7e34;
    }
  }

  /* Orange for Transit */
  &.transit {
    background-color: var(--color-primary);
    color: var(--color-white);
    &:hover {
      background-color: var(--color-primary-dark);
    }
  }

  /* Neutral for current status */
  &:disabled {
    background-color: #ddd;
    color: var(--color-text-light);
    cursor: not-allowed;
  }
`;
