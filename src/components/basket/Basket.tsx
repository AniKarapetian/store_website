import React, { FC, useEffect, useState } from "react";
import BasketTable from "./BasketTable";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getBasketByUserId } from "../../store/basket/basket-slice";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { basketSelector } from "../../store/basket/basket-selector";
import { createOrder } from "../../store/orders/orders-slice";
import { Order } from "../order/type";
import { AppDispatch } from "../../store/type";

const Basket: FC<any> = ({ showAlert }) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(userSelector);
  const basket = useSelector(basketSelector);

  useEffect(() => {
    user && dispatch(getBasketByUserId(user.id));
  }, [dispatch]);

  const createNewOrder = () => {
    const order: Order = {
      userId: basket!.userId,
      date: `${new Date()}`,
      items: basket!.items,
    };
    dispatch(createOrder(order));
    showAlert("success", "Your order successfully done!");
  };

  return (
    <div>
      {!!basket && (
        <div>
          <BasketTable basketItems={basket?.items} />
          <Button variant="success" onClick={createNewOrder}>
            Order
          </Button>
        </div>
      )}
    </div>
  );
};

export default Basket;
