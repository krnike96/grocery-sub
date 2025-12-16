import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../../api/axios";
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // Form States
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    unit: "",
    stock: "",
    image: "",
    description: "",
  });
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
    desc: "",
  });

  const fetchData = async () => {
    try {
      const [catRes, userRes] = await Promise.all([
        API.get("/categories/get-categories"),
        API.get("/users"),
      ]);
      setCategories(catRes.data);
      setUsers(userRes.data);
    } catch (err) {
      toast.error("Error fetching admin data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic: Ensure price and stock are numbers
      const payload = {
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock),
      };
      await API.post("/products", payload);
      toast.success("Product added successfully!");
      setProductData({
        name: "",
        price: "",
        category: "",
        unit: "",
        stock: "",
        image: "",
        description: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  const deleteUserHandler = async (id) => {
    if (window.confirm("Permanent Action: Delete this user?")) {
      try {
        await API.delete(`/users/${id}`);
        toast.success("User removed");
        fetchData();
      } catch (err) {
        toast.error("Authority error: Action denied");
      }
    }
  };

  return (
    <AdminDashboardContainer>
      <TabContainer>
        <TabButton
          active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
        >
          Add Product
        </TabButton>
        <TabButton
          active={activeTab === "categories"}
          onClick={() => setActiveTab("categories")}
        >
          Manage Categories
        </TabButton>
        <TabButton
          active={activeTab === "users"}
          onClick={() => setActiveTab("users")}
        >
          Authority (Users & Subs)
        </TabButton>
      </TabContainer>

      {activeTab === "products" && (
        <FormCard>
          <FormTitle>Add New Grocery Item</FormTitle>
          <form onSubmit={handleProductSubmit}>
            <FormGroup>
              <Label>Product Name</Label>
              <Input
                type="text"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Select
                value={productData.category}
                onChange={(e) =>
                  setProductData({ ...productData, category: e.target.value })
                }
                required
              >
                <option value="">Select Existing Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div style={{ display: "flex", gap: "10px" }}>
              <FormGroup style={{ flex: 1 }}>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <FormGroup style={{ flex: 1 }}>
                <Label>Unit</Label>
                <Input
                  type="text"
                  value={productData.unit}
                  onChange={(e) =>
                    setProductData({ ...productData, unit: e.target.value })
                  }
                  required
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label>Initial Stock</Label>
              <Input
                type="number"
                value={productData.stock}
                onChange={(e) =>
                  setProductData({ ...productData, stock: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Image URL</Label>
              <Input
                type="text"
                value={productData.image}
                onChange={(e) =>
                  setProductData({ ...productData, image: e.target.value })
                }
                required
              />
            </FormGroup>
            <PrimaryButton type="submit">Save Product</PrimaryButton>
          </form>
        </FormCard>
      )}

      {activeTab === "categories" && (
        <FormCard>
          <FormTitle>Create Category</FormTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              API.post("/categories", categoryData).then(() => {
                toast.success("Created");
                fetchData();
              });
            }}
          >
            <FormGroup>
              <Label>Category Name</Label>
              <Input
                type="text"
                value={categoryData.name}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, name: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Image URL</Label>
              <Input
                type="text"
                value={categoryData.image}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, image: e.target.value })
                }
                required
              />
            </FormGroup>
            <PrimaryButton type="submit">Add Category</PrimaryButton>
          </form>
        </FormCard>
      )}

      {activeTab === "users" && (
        <FormCard>
          <FormTitle>Authority Panel</FormTitle>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", background: "#f4f4f4" }}>
                <th style={{ padding: "10px" }}>User</th>
                <th style={{ padding: "10px" }}>Role</th>
                <th style={{ padding: "10px" }}>Authority Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>
                    {u.name}
                    <br />
                    <small>{u.email}</small>
                  </td>
                  <td style={{ padding: "10px" }}>
                    {u.isAdmin ? "👑 Admin" : "User"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => deleteUserHandler(u._id)}
                      style={{
                        background: "#ff4d4d",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FormCard>
      )}
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
