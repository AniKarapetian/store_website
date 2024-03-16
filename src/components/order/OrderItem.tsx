import React from "react";
import { Card } from "react-bootstrap";
import { Product } from "../product/type";

export const OrderItem: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card>
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Price: {product.price} AMD</Card.Text>
        <Card.Text>Quantity: {product.count}</Card.Text>
      </Card.Body>
    </Card>
  );
};
