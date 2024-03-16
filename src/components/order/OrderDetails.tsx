import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "../product/type";
import { OrderItem } from "./OrderItem";
import { OrderProps } from "./type";

const OrderDetails: React.FC<OrderProps> = ({ order }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Order ID: {order.id}</h2>
          <p>Date: {order.date}</p>
        </Col>
      </Row>
      <Row>
        {order.items.map((item: Product) => (
          <Col key={item.id} xs={12} md={4}>
            <OrderItem product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default OrderDetails;
