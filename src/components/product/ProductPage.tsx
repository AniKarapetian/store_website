import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Product } from "./type";
import { Card, Button } from "react-bootstrap";
import { Icon } from "../base-components/Icon";
import { useParams } from "react-router-dom";
import { getProductById } from "../../actions/products-actions";
import { getBasketByUserId, updateBasket } from "../../actions/basket-actions";
import { Basket, BasketItem } from "../basket/type";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";

export const ProductPage: FC<any> = ({ showAlert }) => {
  const [product, setProduct] = useState<Product>();
  const [basket, setBasket] = useState<Basket>();
  const user = useSelector(userSelector);
  const { id } = useParams();
  const getBasket = async () => {
    if (user) {
      setBasket(await getBasketByUserId(user.id));
    }
  };
  const getProduct = async () => {
    id && setProduct(await getProductById(id));
  };
  useEffect(() => {
    getBasket();
    getProduct();
  }, [id, user]);

  const addToBasket = () => {
    if (product) {
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
    }
  };

  return (
    <div className="m-2">
      {!!product && (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={product.imageUrl} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>{product.count}</Card.Text>
            <Card.Text>{product.price}</Card.Text>
            <Button variant="success" onClick={() => addToBasket()}>
              <Icon iconName="BagPlus" />
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
