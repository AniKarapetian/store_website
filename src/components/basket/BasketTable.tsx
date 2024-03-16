import React, { FC, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BasketItem } from "./type";
import { Icon } from "../base-components/Icon";

type TableProps = {
  basketItems: BasketItem[];
};

const BasketTable: FC<TableProps> = ({ basketItems }) => {
  const handleDelete = (id: string) => {
    // removeUser(id);
  };

  // const handleEdit = (item: User) => {
  //   setUser({ ...item });
  //   toggleModal();
  // };
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
                    onClick={() => handleDelete(item.id)}
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
