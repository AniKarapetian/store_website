import React, { useState } from "react";
import { FC } from "react";
import { IProductPageProps, Product } from "./type";
import { Card, Button } from "react-bootstrap";
import { Icon } from "../base-components/Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import ProductModal from "./ProductModal";
import {
  removeProduct,
  updateProduct,
} from "../../store/products/products-slice";
import { updateBasket } from "../../store/basket/basket-slice";
import { basketSelector } from "../../store/basket/basket-selector";
import { BasketItem } from "../basket/type";
import { v4 as uuid } from "uuid";
import { AppDispatch } from "../../store/type";
export const ProductCard: FC<IProductPageProps> = ({ product }) => {
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const basket = useSelector(basketSelector);
  const dispatch: AppDispatch = useDispatch();
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
    dispatch(removeProduct(id));
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleEdit = (product: Product) => {
    setProduct({ ...product });
    toggleModal();
  };

  const addToBasket = (product: Product) => {
    const basketItem: BasketItem = {
      id: uuid(),
      title: product.title,
      quantity: 1,
      price: product.price,
      imageUrl: product.imageUrl,
    };

    dispatch(
      updateBasket({
        id: basket?.id,
        userId: basket!.userId,
        items: [...basket!.items, basketItem],
      })
    );
  };
  const openDetails = () => {
    navigate("/products/1");
  };

  const handleSave = (product: Product) => {
    dispatch(updateProduct(product));
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
          {user && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="success"
                onClick={() => {
                  addToBasket(product);
                }}
              >
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
          )}
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
