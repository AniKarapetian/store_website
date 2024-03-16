import React, { useState } from "react";
import { FC } from "react";
import { IProductPageProps, Product } from "./type";
import { Card, Button, Col } from "react-bootstrap";
import { Icon } from "../base-components/Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { remove, update } from "../../store/products/products-slice";
import ProductModal from "./ProductModal";
export const ProductCard: FC<IProductPageProps> = ({ product }) => {
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [productData, setProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    count: 0,
    price: 0,
  });
  const handleDelete = (id: string) => {
    dispatch(remove(id) as any);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleEdit = (product: Product) => {
    setProduct({ ...product });
    toggleModal();
  };
  const openDetails = () => {
    navigate("/products/1");
  };

  const handleSave = (product: Product) => {
    dispatch(update(product) as any);
    handleCancel();
  };
  const handleCancel = () => {
    toggleModal();
    setProduct({
      id: "",
      title: "",
      description: "",
      imageUrl: "",
      count: 0,
      price: 0,
    });
  };
  return (
    <div className="m-2">
      <Card style={{ width: "17rem" }}>
        <Card.Img variant="top" src={product.imageUrl} height={250} />
        <Card.Body>
          <Card.Link onClick={openDetails}>{product.title}</Card.Link>

          <Card.Text>{product.price} AMD</Card.Text>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="success">
              <Icon iconName="BagPlus" />
            </Button>
            {user?.role === "admin" && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleEdit(product);
                  }}
                >
                  <Icon iconName="Pencil" />
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  variant="danger"
                >
                  <Icon iconName="Trash" />
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
      {showModal && (
        <ProductModal
          data={productData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
