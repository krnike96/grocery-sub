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
  PrimaryButton,
  HelperText,
} from "./Login-style";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Future Axios Call (Placeholder Logic) ---
    console.log("Attempting login with:", formData);

    if (email === "admin@test.com" && password === "password") {
      toast.success("Login Successful! Redirecting to Admin Dashboard.");
      
    } else if (email === "user@test.com" && password === "password") {
      toast.success("Welcome back! Redirecting to Groceries.");
      // navigate('/');
    } else {
      toast.error("Invalid Credentials. Please check email and password.");
    }
    // --- End Placeholder Logic ---
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Sign In</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="e.g., user@example.com"
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
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <PrimaryButton type="submit">Login</PrimaryButton>
        </form>

        <HelperText>
          New to GrocerySub? <Link to="/register">Create an account</Link>
        </HelperText>
      </AuthCard>
    </AuthContainer>
  );
};

export default LoginPage;
