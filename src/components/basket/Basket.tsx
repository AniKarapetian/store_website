import React, { FC, useState } from "react";
import BasketTable from "./BasketTable";
import { BasketItem } from "./type";
import { Button } from "react-bootstrap";
import SuccessAlert from "./SuccessAlert";

const Basket: FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [basket, setBasket] = useState<BasketItem[]>([
    {
      id: "basket-1",
      title: "T-Shirt",
      imageUrl:
        "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
      quantity: 3,
      price: 5000,
    },
    {
      id: "basket-2",
      title: "T-Shirt",
      imageUrl:
        "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
      quantity: 1,
      price: 500,
    },
  ]);

  const createOrder = () => {
    setBasket([]);
    setShowSuccessMsg(true);
  };
  return (
    <div>
      {!!basket.length && (
        <div>
          <BasketTable basketItems={basket} />
          <Button variant="success" onClick={createOrder}>
            Order
          </Button>
        </div>
      )}
      {showSuccessMsg && <SuccessAlert />}
    </div>
  );
};

export default Basket;
