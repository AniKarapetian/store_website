import React, { useState } from "react";
import { Container } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import { Order } from "./type";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "order-1",
      date: `${new Date()}`,
      items: [
        {
          id: "2222",
          title: "T-Shirt",
          description: "Woman t-shirt",
          imageUrl:
            "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
          count: 10,
          price: 5000,
        },
        {
          id: "22722",
          title: "T-Shirt",
          description: "Woman t-shirt",
          imageUrl:
            "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
          count: 10,
          price: 5000,
        },
      ],
    },
  ]);
  return (
    <Container>
      {orders.map((order, index) => {
        return <OrderDetails order={order} key={index} />;
      })}
    </Container>
  );
};

export default Orders;
