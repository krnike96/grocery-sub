import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AuthContainer,
  AuthCard,
  Title,
  FormGroup,
  Label,
  Input,
  Select,
  PrimaryButton,
  HelperText,
} from "./Register-style"; // Note the import path

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role for new signups
  });
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Future Axios Call (Placeholder Logic) ---
    console.log("Attempting registration with:", formData);

    // Simple validation check
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Simulate successful registration
    toast.success(
      `Registration successful as a ${role.toUpperCase()}! Redirecting to login.`
    );
    // Future: API call here.
    // navigate('/login');
    // --- End Placeholder Logic ---
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Create Account</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              value={name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="e.g., john.doe@email.com"
              value={email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="role">Account Role</Label>
            <Select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              required
            >
              <option value="user">Customer (Order Groceries)</option>
              <option value="delivery">Delivery Person (Fulfill Orders)</option>
              {/* Admin role is typically restricted, but included for initial setup */}
              <option value="admin">
                Administrator (Manage Products/Users)
              </option>
            </Select>
          </FormGroup>

          <PrimaryButton type="submit">Register</PrimaryButton>
        </form>

        <HelperText>
          Already have an account? <Link to="/login">Sign in here</Link>
        </HelperText>
      </AuthCard>
    </AuthContainer>
  );
};

export default RegisterPage;
