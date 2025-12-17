import styled from "styled-components";
import {
  AuthCard,
  Title,
  FormGroup,
  Label,
  Input,
  PrimaryButton,
} from "../../auth/Login/Login-style";

export const AdminDashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  overflow-x: auto; /* Scrollable on mobile */
`;

export const TabButton = styled.button`
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) =>
    props.$active ? "var(--color-primary)" : "var(--color-text-light)"};
  border-bottom: 3px solid
    ${(props) => (props.$active ? "var(--color-primary)" : "transparent")};
  margin-right: 5px;
  background: transparent;
  transition: all 0.2s;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
    background-color: #f9f9f9;
  }
`;

export const FormCard = styled(AuthCard)`
  max-width: 800px; /* Wider form for admin */
  margin: 0 auto;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const FormTitle = styled(Title)`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: left;
`;

export const Select = styled.select`
  ${Input};
  height: 48px;
  background-color: var(--color-white);
  cursor: pointer;
`;

// --- NEW TABLE STYLES ---
export const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Force scroll on small screens */

  th,
  td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
  }

  th {
    background-color: #f8f9fa;
    color: var(--color-text-dark);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: #fafafa;
  }
`;

// --- NEW BIGGER ACTION BUTTONS ---
export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: white;
  color: var(--color-text-dark);
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &.delete:hover {
    background-color: #ffeaea;
    color: #dc3545;
    border-color: #dc3545;
  }

  &.edit:hover {
    background-color: #eaf4ff;
    color: #007bff;
    border-color: #007bff;
  }

  &.save:hover {
    background-color: #e6fffa;
    color: #28a745;
    border-color: #28a745;
  }
`;

export { FormGroup, Label, Input, PrimaryButton };
