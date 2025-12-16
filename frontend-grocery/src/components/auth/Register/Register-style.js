// We can typically import styles directly from the shared Auth components,
// but sticking strictly to the directory rule:

// --- NOTE: We will reuse common Auth styles defined in Login-style.js ---
// In a large project, we would refactor AuthCard, Input, Button into a shared /components/common folder.
// For now, we will import and extend or define only specific styles.
import styled from "styled-components";
import {
  AuthContainer,
  AuthCard,
  Title,
  FormGroup,
  Label,
  Input,
  PrimaryButton,
  HelperText,
} from "../Login/Login-style";

// Exporting reusable styles
export {
  AuthContainer,
  AuthCard,
  Title,
  FormGroup,
  Label,
  Input,
  PrimaryButton,
  HelperText,
};

// Define the Select component style
export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: var(--color-white);
  transition: border-color 0.2s;
  appearance: none; /* Remove default arrow on some browsers */
  cursor: pointer;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
  }
`;
