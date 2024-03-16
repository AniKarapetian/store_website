import React, { FC, useEffect, useState } from "react";
import BasketTable from "./BasketTable";
import { Button } from "react-bootstrap";
import SuccessAlert from "./SuccessAlert";
import { useDispatch } from "react-redux";
import { getBasketByUserId } from "../../store/basket/basket-slice";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { basketSelector } from "../../store/basket/basket-selector";
import { createOrder } from "../../store/orders/orders-slice";
import { Order } from "../order/type";

const Basket: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const basket = useSelector(basketSelector);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    dispatch(getBasketByUserId(user.id) as any);
  }, [dispatch]);

  const createNewOrder = () => {
    const order: Order = {
      userId: basket!.userId,
      date: `${new Date()}`,
      items: basket!.items,
    };
    dispatch(createOrder(order) as any);
    setShowSuccessMsg(true);
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
      {showSuccessMsg && <SuccessAlert />}
    </div>
  );
};

export default Basket;
