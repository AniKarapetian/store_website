import React from "react";
import { Card } from "react-bootstrap";
import { BasketItem } from "../basket/type";

export const OrderItem: React.FC<{ item: BasketItem }> = ({ item }) => {
  return (
    <Card>
      <Card.Img variant="top" src={item.imageUrl} height={150} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>Quantity: {item.quantity}</Card.Text>
        <Card.Text>Price: {item.price} AMD</Card.Text>
        <Card.Text>Total Price: {item.quantity * item.price} AMD</Card.Text>
      </Card.Body>
    </Card>
  );
};
