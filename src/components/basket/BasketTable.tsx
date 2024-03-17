import React, { FC } from "react";
import { Table } from "react-bootstrap";
import { BasketItem } from "./type";
import { Icon } from "../base-components/Icon";
import classes from "../base-components/styles.module.css";

type TableProps = {
  basketItems: BasketItem[];
};

const BasketTable: FC<TableProps> = ({ basketItems }) => {
  const removeItem = (id: string) => {
    // dispatch(updateBasket({}) );
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
                  <Icon iconName="DashCircle" className={classes.icon} />
                  {item.quantity}
                  <Icon iconName="PlusCircle" className={classes.icon} />
                </td>
                <td>{item.quantity * item.price}</td>
                <td>
                  <Icon
                    iconName="XCircle"
                    onClick={() => removeItem(item.id!)}
                    color="red"
                    className={classes.icon}
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
