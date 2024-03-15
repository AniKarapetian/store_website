import React, { ChangeEvent, useState } from "react";
import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { ModalProps, Product } from "./type";

const ProductModal: FC<ModalProps> = ({ data, onCancel, onSave }) => {
  const [product, setProduct] = useState<Product>({ ...data });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show onHide={onCancel}>
        <Modal.Header>
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Title</InputGroup.Text>
            <Form.Control
              type="text"
              value={product.title}
              name="title"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Description</InputGroup.Text>
            <Form.Control
              type="text"
              value={product.description}
              name="description"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Image</InputGroup.Text>
            <Form.Control
              type="text"
              value={product.imageUrl}
              name="imageUrl"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Count</InputGroup.Text>
            <Form.Control
              type="number"
              value={product.count}
              name="count"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Price</InputGroup.Text>
            <Form.Control
              type="number"
              value={product.price}
              name="price"
              onChange={handleChange}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => onSave(product)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductModal;
