import React, { FC, useEffect, useState } from "react";
import BasketTable from "./BasketTable";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { createOrder } from "../../actions/orders-actions";
import { Order } from "../order/type";
import { getBasketByUserId } from "../../actions/basket-actions";
import { Basket as BasketType } from "./type";

const Basket: FC<any> = ({ showAlert }) => {
  const [basket, setBasket] = useState<BasketType>();
  const user = useSelector(userSelector);
  const getBasket = async () => {
    user && setBasket(await getBasketByUserId(user.id));
  };

  useEffect(() => {
    getBasket();
  }, []);

  const createNewOrder = () => {
    const order: Order = {
      userId: basket!.userId,
      date: `${new Date()}`,
      items: basket!.items,
    };
    createOrder(order);
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
