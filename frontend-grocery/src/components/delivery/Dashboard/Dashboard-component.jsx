import React, { useState } from "react";
import { toast } from "react-toastify";
import { Truck, MapPin, Package, CheckCircle } from "lucide-react";
import {
  DeliveryContainer,
  Title,
  OrdersList,
  OrderCard,
  OrderDetails,
  DetailItem,
  OrderStatus,
  ActionButtons,
  StatusButton,
} from "./Dashboard-style";

// Placeholder Order Data
const mockOrders = [
  {
    id: "ORD001",
    customerName: "Alice Johnson",
    address: "123 Main St, Apt 4B",
    status: "assigned",
    items: 5,
    total: 45.99,
  },
  {
    id: "ORD002",
    customerName: "Bob Smith",
    address: "45 Oak Ave, House #2",
    status: "transit",
    items: 3,
    total: 22.5,
  },
  {
    id: "ORD003",
    customerName: "Charlie Brown",
    address: "789 Pine Ln",
    status: "delivered",
    items: 7,
    total: 88.0,
  },
];

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState(mockOrders);

  const updateStatus = (orderId, newStatus) => {
    // --- Future Axios Call (Placeholder Logic) ---
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    toast.info(`Order ${orderId} updated to ${newStatus.toUpperCase()}.`);
    // --- End Placeholder Logic ---
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "assigned":
        return "Assigned";
      case "transit":
        return "In Transit";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  return (
    <DeliveryContainer>
      <Title>Assigned Deliveries</Title>

      <OrdersList>
        {orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderDetails>
              <DetailItem>
                <Package size={16} style={{ marginRight: "5px" }} />
                Order ID: <span>{order.id}</span>
              </DetailItem>
              <DetailItem>
                <MapPin size={16} style={{ marginRight: "5px" }} />
                Customer: <span>{order.customerName}</span>, {order.address}
              </DetailItem>
              <DetailItem>
                Items: <span>{order.items}</span> | Total:{" "}
                <span>${order.total.toFixed(2)}</span>
              </DetailItem>
              <DetailItem>
                Status:{" "}
                <OrderStatus $status={order.status}>
                  {getStatusLabel(order.status)}
                </OrderStatus>
              </DetailItem>
            </OrderDetails>

            <ActionButtons>
              {/* "In Transit" Button */}
              {order.status === "assigned" && (
                <StatusButton
                  className="transit"
                  onClick={() => updateStatus(order.id, "transit")}
                >
                  <Truck size={18} style={{ marginRight: "5px" }} />
                  Start Trip
                </StatusButton>
              )}

              {/* "Delivered" Button */}
              {order.status === "transit" && (
                <StatusButton
                  className="complete"
                  onClick={() => updateStatus(order.id, "delivered")}
                >
                  <CheckCircle size={18} style={{ marginRight: "5px" }} />
                  Mark Delivered
                </StatusButton>
              )}

              {/* Disabled button for completed orders */}
              {order.status === "delivered" && (
                <StatusButton disabled>Completed</StatusButton>
              )}
            </ActionButtons>
          </OrderCard>
        ))}
      </OrdersList>
    </DeliveryContainer>
  );
};

export default DeliveryDashboard;
