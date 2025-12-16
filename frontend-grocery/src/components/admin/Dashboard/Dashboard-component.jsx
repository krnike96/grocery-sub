import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  AdminDashboardContainer,
  TabContainer,
  TabButton,
  FormCard,
  FormTitle,
  FormGroup,
  Label,
  Input,
  Select,
  Textarea,
  PrimaryButton,
} from "./Dashboard-style";

// Component for the "Add New Product" tab
const AddProductTab = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "fruits",
    price: "",
    unit: "kg",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Future Axios Call (Placeholder Logic) ---
    console.log("Admin submitting new product:", product);

    if (!product.name || !product.price) {
      toast.error("Name and Price are required fields.");
      return;
    }

    toast.success(`Product "${product.name}" added successfully!`);

    // Reset form after successful submission
    setProduct({
      name: "",
      category: "fruits",
      price: "",
      unit: "kg",
      description: "",
      imageUrl: "",
    });
    // --- End Placeholder Logic ---
  };

  return (
    <FormCard>
      <FormTitle>Add New Grocery Item</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Product Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="e.g., Organic Bananas"
            value={product.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
            <option value="staples">Staples</option>
          </Select>
        </FormGroup>

        <FormGroup style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 3 }}>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="e.g., 2.99"
              value={product.price}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>
          <div style={{ flex: 2 }}>
            <Label htmlFor="unit">Unit</Label>
            <Input
              type="text"
              id="unit"
              name="unit"
              placeholder="e.g., kg, dozen"
              value={product.unit}
              onChange={handleChange}
              required
            />
          </div>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="imageUrl">Image URL (Placeholder)</Label>
          <Input
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="http://example.com/image.jpg"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Short description of the product"
            value={product.description}
            onChange={handleChange}
          />
        </FormGroup>

        <PrimaryButton type="submit">Save Product</PrimaryButton>
      </form>
    </FormCard>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("addProduct"); // 'addProduct', 'viewOrders', 'manageUsers'

  const renderContent = () => {
    switch (activeTab) {
      case "addProduct":
        return <AddProductTab />;
      case "viewOrders":
        return (
          <div>
            <h2>View All Orders (Coming Soon)</h2>
          </div>
        );
      case "manageUsers":
        return (
          <div>
            <h2>Manage Users (Coming Soon)</h2>
          </div>
        );
      default:
        return <AddProductTab />;
    }
  };

  return (
    <AdminDashboardContainer>
      <FormTitle>Admin Control Panel</FormTitle>

      <TabContainer>
        <TabButton
          $active={activeTab === "addProduct"}
          onClick={() => setActiveTab("addProduct")}
        >
          Add Product
        </TabButton>
        <TabButton
          $active={activeTab === "viewOrders"}
          onClick={() => setActiveTab("viewOrders")}
        >
          View Orders
        </TabButton>
        <TabButton
          $active={activeTab === "manageUsers"}
          onClick={() => setActiveTab("manageUsers")}
        >
          Manage Users
        </TabButton>
      </TabContainer>

      {renderContent()}
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
