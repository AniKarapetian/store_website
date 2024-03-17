import React from "react";
import { Card } from "react-bootstrap";
import { BasketItem } from "../basket/type";

export const OrderItem: React.FC<{ item: BasketItem }> = ({ item }) => {
  return (
    <Card style={{ marginTop: "10px" }}>
      <Card.Img variant="top" src={item.imageUrl} height={250} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>Quantity: {item.quantity}</Card.Text>
        <Card.Text>Price: {item.price} AMD</Card.Text>
        <Card.Text>Total: {item.quantity * item.price} AMD</Card.Text>
      </Card.Body>
    </Card>
  );
};
