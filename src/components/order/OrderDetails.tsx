import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "../product/type";
import { OrderItem } from "./OrderItem";
import { OrderProps } from "./type";
import { BasketItem } from "../basket/type";

const OrderDetails: React.FC<OrderProps> = ({ order }) => {
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
    </Container>
  );
};
export default OrderDetails;
