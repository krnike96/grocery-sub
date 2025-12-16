import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext"; // Import useAuth
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
} from "./Register-style";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth(); // Destructure register from context

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password);
      toast.success("Account created successfully!");
      navigate("/"); // Redirect to dashboard after signup
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Role is visible for initial setup/demo, usually hidden in production */}
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
              <option value="delivery">Delivery Person</option>
              <option value="admin">Administrator</option>
            </Select>
          </FormGroup>

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Register"}
          </PrimaryButton>
        </form>

        <HelperText>
          Already have an account? <Link to="/login">Sign in here</Link>
        </HelperText>
      </AuthCard>
    </AuthContainer>
  );
};

export default RegisterPage;
