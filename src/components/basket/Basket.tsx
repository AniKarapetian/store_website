import React, { FC, useEffect, useState } from "react";
import BasketTable from "./BasketTable";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { createOrder } from "../../actions/orders-actions";
import { Order } from "../order/type";
import { getBasketByUserId, updateBasket } from "../../actions/basket-actions";
import { Basket as BasketType } from "./type";

const Basket: FC<any> = ({ showAlert }) => {
  const [basket, setBasket] = useState<BasketType>();
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector(userSelector);
  const getBasket = async () => {
    user && setBasket(await getBasketByUserId(user.id));
  };

  useEffect(() => {
    if (basket) {
      const totalCost = basket.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setTotalPrice(totalCost);
    }
  }, [basket]);

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
    setBasket({ ...basket, items: [] } as BasketType);
    updateBasket({ ...basket, items: [] } as BasketType);
    showAlert("success", "Your order successfully done!");
  };

  const removeItem = (id: string) => {
    const newItems = basket?.items.filter((item) => item.id !== id);
    const newBasket = { ...basket, items: newItems } as BasketType;
    setBasket(newBasket);
    updateBasket(newBasket);
  };

  const updateItemCount = (step: number, id: string) => {
    if (basket) {
      const index: number = basket!.items.findIndex((item) => item.id === id);
      const count = basket!.items[index].quantity + step;
      if (!count) {
        removeItem(id);
      } else {
        basket!.items[index].quantity = count;
        updateBasket({ ...basket });
        setBasket({ ...basket });
      }
    }
  };
  return (
    <div>
      {!!basket && !!basket.items.length ? (
        <div>
          <BasketTable
            basketItems={basket?.items}
            actions={{ removeItem, updateItemCount }}
          />
          <p className="m-1">
            <b>Total price: {totalPrice} AMD</b>
          </p>
          <Button variant="success" onClick={createNewOrder}>
            Order
          </Button>
        </div>
      ) : (
        <div>Your basket is empty</div>
      )}
    </div>
  );
};

export default Basket;
