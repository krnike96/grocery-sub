import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
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
    address: "",
    city: "",
    postalCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const { name, email, password, role, address, city, postalCode } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Validation for customer address
    if (role === "user" && (!address || !city || !postalCode)) {
      toast.error("Please provide complete address details.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Pass the role and address to the register function
      // If role is admin, isAdmin will be true; else false.
      const registrationData = {
        name,
        email,
        password,
        isAdmin: role === "admin",
        defaultAddress: role === "user" ? { address, city, postalCode } : null,
      };

      await register(registrationData);
      toast.success("Account created successfully!");
      navigate("/");
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
              <option value="admin">Administrator</option>
            </Select>
          </FormGroup>

          {/* Conditional Address Fields for Customers only */}
          {role === "user" && (
            <>
              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="House No / Street"
                  value={address}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <div style={{ display: "flex", gap: "10px" }}>
                <FormGroup style={{ flex: 1 }}>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup style={{ flex: 1 }}>
                  <Label htmlFor="postalCode">Pincode</Label>
                  <Input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Pincode"
                    value={postalCode}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>
            </>
          )}

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
