import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { ordersSelector } from "../../store/orders/orders-selector";
import { userSelector } from "../../store/login/login-selector";
import { getOrders } from "../../store/orders/orders-slice";

const Orders: React.FC = () => {
  const orders = useSelector(ordersSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(user.id) as any);
  }, [dispatch]);
  return (
    <Container>
      {orders.map((order, index) => {
        return <OrderDetails order={order} key={index} />;
      })}
    </Container>
  );
};

export default Orders;
