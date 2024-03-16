import React, { FC, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BasketItem } from "./type";
import { Icon } from "../base-components/Icon";
import { useDispatch } from "react-redux";
import { updateBasket } from "../../store/basket/basket-slice";

type TableProps = {
  basketItems: BasketItem[];
};

const BasketTable: FC<TableProps> = ({ basketItems }) => {
  const dispatch = useDispatch();
  const removeItem = (id: string) => {
    dispatch(updateBasket({}) as any);
  };

  const updateItemCount = (step: number) => {};

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {basketItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <img src={item.imageUrl} height={50}></img>
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <Icon iconName="DashCircle" />
                  {item.quantity}
                  <Icon iconName="PlusCircle" />
                </td>
                <td>{item.quantity * item.price}</td>
                <td>
                  <Icon
                    iconName="XCircle"
                    onClick={() => removeItem(item.id!)}
                    color="red"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default BasketTable;
