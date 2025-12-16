import styled from "styled-components";

// Reusing and importing common styles (Input, Label, Button, etc.) from Auth components
// In a real app, these would be in a shared 'common' folder, but we follow the strict component-level structure.
import {
  AuthCard,
  Title,
  FormGroup,
  Label,
  Input,
  PrimaryButton,
} from "../../auth/Login/Login-style"; // Reusing visual components

export const AdminDashboardContainer = styled.div`
  padding: 20px;
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #ddd;
`;

export const TabButton = styled.button`
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) =>
    props.$active ? "var(--color-primary)" : "var(--color-text-light)"};
  border-bottom: 3px solid
    ${(props) => (props.$active ? "var(--color-primary)" : "transparent")};
  margin-right: 15px;
  transition: color 0.2s, border-bottom 0.2s;
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }
`;

export const FormCard = styled(AuthCard)`
  /* Admin form is slightly wider than login form */
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
`;

export const FormTitle = styled(Title)`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: left;
`;

export const Select = styled.select`
  ${Input}; /* Inherit styles from the Input component */
  height: 48px;
  background-color: var(--color-white);
  cursor: pointer;
`;

export const Textarea = styled.textarea`
  ${Input}; /* Inherit styles from the Input component */
  resize: vertical;
  min-height: 100px;
`;

// Exporting reused components for easy import in .jsx file
export { FormGroup, Label, Input, PrimaryButton };
