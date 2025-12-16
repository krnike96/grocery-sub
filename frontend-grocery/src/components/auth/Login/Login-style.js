import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(
    100vh - 60px - 40px
  ); /* Screen height minus Navbar and padding */
  padding: 20px;
`;

export const AuthCard = styled.div`
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-medium);
  padding: 40px;
  width: 100%;
  max-width: 400px; /* Standard card width */
  text-align: center;
`;

export const Title = styled.h2`
  color: var(--color-text-dark);
  margin-bottom: 25px;
  font-size: 2rem;
  font-weight: 700;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--color-text-dark);
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary); /* Custom focus ring */
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 10px;

  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f7b489; /* Lighter shade for disabled state */
    cursor: not-allowed;
  }
`;

export const HelperText = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;
  color: var(--color-text-light);

  a {
    font-weight: 600;
  }
`;
