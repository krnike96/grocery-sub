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
