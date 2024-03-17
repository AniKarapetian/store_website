import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { OrderItem } from "./OrderItem";
import { OrderProps } from "./type";
import { BasketItem } from "../basket/type";

const OrderDetails: React.FC<OrderProps> = ({ order }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (order) {
      const totalCost = order.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setTotalPrice(totalCost);
    }
  }, [order]);

  return (
    <Container
      style={{
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "15px",
      }}
    >
      <Row>
        <Col>
          <h3>Order ID: {order.id}</h3>
          <p>Date: {order.date}</p>
        </Col>
      </Row>
      <Row>
        {order.items.map((item: BasketItem) => (
          <Col key={item.id} xs={12} md={4}>
            <OrderItem item={item} />
          </Col>
        ))}
      </Row>
      <Row>
        <p className="m-2">
          <b>Total price: {totalPrice} AMD</b>
        </p>
      </Row>
    </Container>
  );
};
export default OrderDetails;
