import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2, CheckCircle, Truck, Edit3, Save, X } from "lucide-react";
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
  PrimaryButton,
  TableContainer,
  Table,
  ActionButton,
} from "./Dashboard-style";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const [editStockId, setEditStockId] = useState(null);
  const [newStockValue, setNewStockValue] = useState("");

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

  const fetchAllData = async () => {
    try {
      const [ordRes, prodRes, catRes, userRes] = await Promise.all([
        API.get("/orders"),
        API.get("/products"),
        API.get("/categories/get-categories"),
        API.get("/users"),
      ]);
      setOrders(ordRes.data);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      setUsers(userRes.data);
    } catch (err) {
      toast.error("Error fetching dashboard data");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [activeTab]);

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      toast.success(`Order updated to ${status}`);
      fetchAllData();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Delete this order?")) {
      try {
        await API.delete(`/orders/${id}`);
        toast.success("Order Deleted");
        fetchAllData();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products", {
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock),
      });
      toast.success("Product added!");
      setProductData({
        name: "",
        price: "",
        category: "",
        unit: "",
        stock: "",
        image: "",
        description: "",
      });
      fetchAllData();
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  const handleUpdateStock = async (id) => {
    try {
      await API.put(`/products/${id}`, { stock: Number(newStockValue) });
      toast.success("Stock updated");
      setEditStockId(null);
      fetchAllData();
    } catch (err) {
      toast.error("Stock update failed");
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Delete product?")) {
      try {
        await API.delete(`/products/${id}`);
        toast.success("Product deleted");
        fetchAllData();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/categories", categoryData);
      toast.success("Category created");
      setCategoryData({ name: "", image: "", desc: "" });
      fetchAllData();
    } catch (err) {
      toast.error("Failed to create category");
    }
  };

  const deleteUserHandler = async (id) => {
    if (window.confirm("Permanently delete user?")) {
      try {
        await API.delete(`/users/${id}`);
        toast.success("User deleted");
        fetchAllData();
      } catch (err) {
        toast.error("Cannot delete Admin or User not found");
      }
    }
  };

  return (
    <AdminDashboardContainer>
      <TabContainer>
        <TabButton
          $active={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </TabButton>
        <TabButton
          $active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
        >
          Products & Stock
        </TabButton>
        <TabButton
          $active={activeTab === "categories"}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </TabButton>
        <TabButton
          $active={activeTab === "users"}
          onClick={() => setActiveTab("users")}
        >
          Users
        </TabButton>
      </TabContainer>

      {activeTab === "orders" && (
        <FormCard style={{ maxWidth: "100%" }}>
          <FormTitle>Live Order Management</FormTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6)}</td>
                    <td>{order.user?.name}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          background:
                            order.status === "Delivered"
                              ? "#3bff69ff"
                              : "#e53d0fff",
                          color:
                            order.status === "Delivered"
                              ? "#155724"
                              : "#856404",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <ActionButton
                        onClick={() =>
                          handleUpdateOrderStatus(order._id, "Out for Delivery")
                        }
                        title="Ship"
                      >
                        <Truck size={18} />
                      </ActionButton>
                      <ActionButton
                        onClick={() =>
                          handleUpdateOrderStatus(order._id, "Delivered")
                        }
                        title="Complete"
                        style={{ color: "green" }}
                      >
                        <CheckCircle size={18} />
                      </ActionButton>
                      <ActionButton
                        className="delete"
                        onClick={() => handleDeleteOrder(order._id)}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </FormCard>
      )}

      {activeTab === "products" && (
        <>
          <FormCard>
            <FormTitle>Add New Product</FormTitle>
            <form onSubmit={handleProductSubmit}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                  required
                />
              </FormGroup>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <FormGroup style={{ flex: 1, minWidth: "150px" }}>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({ ...productData, price: e.target.value })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup style={{ flex: 1, minWidth: "150px" }}>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={productData.stock}
                    onChange={(e) =>
                      setProductData({ ...productData, stock: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label>Category</Label>
                <Select
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </Select>
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
              <FormGroup>
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
              <PrimaryButton type="submit">Add Product</PrimaryButton>
            </form>
          </FormCard>

          <FormCard style={{ maxWidth: "100%", marginTop: "30px" }}>
            <FormTitle>Inventory Management</FormTitle>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Stock Level</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td style={{ fontWeight: "bold" }}>{p.name}</td>
                      <td>{p.category}</td>
                      <td>
                        {editStockId === p._id ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <Input
                              type="number"
                              autoFocus
                              style={{
                                width: "80px",
                                padding: "8px",
                                height: "36px",
                                marginBottom: 0,
                              }}
                              value={newStockValue}
                              onChange={(e) => setNewStockValue(e.target.value)}
                            />
                            <ActionButton
                              className="save"
                              onClick={() => handleUpdateStock(p._id)}
                            >
                              <Save size={18} />
                            </ActionButton>
                            <ActionButton onClick={() => setEditStockId(null)}>
                              <X size={18} />
                            </ActionButton>
                          </div>
                        ) : (
                          <span
                            style={{
                              color: p.stock < 10 ? "red" : "inherit",
                              fontWeight: p.stock < 10 ? "bold" : "normal",
                            }}
                          >
                            {p.stock} units
                          </span>
                        )}
                      </td>
                      <td>
                        <ActionButton
                          className="edit"
                          onClick={() => {
                            setEditStockId(p._id);
                            setNewStockValue(p.stock);
                          }}
                        >
                          <Edit3 size={18} />
                        </ActionButton>
                        <ActionButton
                          className="delete"
                          onClick={() => deleteProductHandler(p._id)}
                        >
                          <Trash2 size={18} />
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </FormCard>
        </>
      )}

      {activeTab === "categories" && (
        <FormCard>
          <FormTitle>Create Category</FormTitle>
          <form onSubmit={handleCategorySubmit}>
            <FormGroup>
              <Label>Name</Label>
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
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                value={categoryData.desc}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, desc: e.target.value })
                }
              />
            </FormGroup>
            <PrimaryButton type="submit">Create Category</PrimaryButton>
          </form>
        </FormCard>
      )}

      {activeTab === "users" && (
        <FormCard style={{ maxWidth: "100%" }}>
          <FormTitle>Registered Users</FormTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      {u.isAdmin ? (
                        <span
                          style={{
                            color: "var(--color-primary)",
                            fontWeight: "bold",
                          }}
                        >
                          Admin
                        </span>
                      ) : (
                        "User"
                      )}
                    </td>
                    <td>
                      <ActionButton
                        className="delete"
                        onClick={() => deleteUserHandler(u._id)}
                      >
                        <Trash2 size={18} />
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </FormCard>
      )}
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
