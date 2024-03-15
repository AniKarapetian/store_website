import React from "react";
import { FC } from "react";
import { IProductPageProps, Product } from "./type";
import { Card, Button } from "react-bootstrap";
import { Icon } from "../base-components/Icon";

export const ProductPage: FC<IProductPageProps> = ({ product }) => {
  const handleDelete = (id: string) => {
    // removeProduct(id);
  };

  const handleEdit = (product: Product) => {
    // setProduct({ ...product });
    // toggleModal();
  };
  return (
    <div className="m-2">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>{product.count}</Card.Text>
          <Card.Text>{product.price}</Card.Text>
          <Button variant="success">
            <Icon iconName="BagPlus" />
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              handleEdit(product);
            }}
          >
            <Icon iconName="Pencil" />
          </Button>
          <Button onClick={() => handleDelete(product.id)} variant="danger">
            <Icon iconName="Trash" />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
