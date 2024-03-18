import React, { useState } from "react";
import { FC } from "react";
import { IProductPageProps, Product } from "./type";
import { Card, Button } from "react-bootstrap";
import { Icon } from "../base-components/Icon";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import ProductModal from "./ProductModal";
import { BasketItem } from "../basket/type";
import { v4 as uuid } from "uuid";
import { updateBasket } from "../../actions/basket-actions";
import { Link } from "react-router-dom";
export const ProductCard: FC<IProductPageProps> = ({
  product,
  basket,
  showAlert,
  handleSave,
  handleDelete,
}) => {
  const user = useSelector(userSelector);
  const [showModal, setShowModal] = useState(false);
  const [productData, setProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    count: 0,
    price: 0,
  });
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

    basket &&
      updateBasket({
        id: basket?.id,
        userId: basket!.userId,
        items: [...basket!.items, basketItem],
      });
    showAlert("success", "Product added to basket!");
  };

  const onSave = async (product: Product) => {
    handleSave(product);
    toggleModal();
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
          <Link to={`/products/${product.id}`}>{product.title}</Link>

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
          onSave={onSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
