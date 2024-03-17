import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { getOrders } from "../../actions/orders-actions";
import { Order } from "./type";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const user = useSelector(userSelector);

  const getOrdersData = async () => {
    user && setOrders(await getOrders(user.id));
  };
  useEffect(() => {
    getOrdersData();
  }, []);
  return (
    <Container>
      {orders.map((order, index) => {
        return <OrderDetails order={order} key={index} />;
      })}
    </Container>
  );
};

export default Orders;
