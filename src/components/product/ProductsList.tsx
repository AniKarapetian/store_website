import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { Product } from "./type";
import ProductModal from "./ProductModal";
import { ProductFilterSort } from "./ProductFilterSort";
import { ProductCard } from "./ProductCard";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { productsSelector } from "../../store/products/products-selector";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  createProduct,
  getProducts,
} from "../../store/products/products-slice";
import { getBasketByUserId } from "../../store/basket/basket-slice";

export const ProductsList: FC = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(userSelector);
  const products = useSelector(productsSelector);
  const [product, setProduct] = useState<Product>({
    id: uuid(),
    title: "",
    description: "",
    imageUrl: "",
    count: 0,
    price: 0,
  });

  useEffect(() => {
    dispatch(getProducts());
    user && dispatch(getBasketByUserId(user.id));
  }, [dispatch]);

  const handleAdd = () => {
    toggleModal();
  };

  const handleSave = (product: Product) => {
    dispatch(createProduct(product));
    handleCancel();
  };
  const handleCancel = () => {
    toggleModal();
    setProduct({
      id: uuid(),
      title: "",
      description: "",
      imageUrl: "",
      count: 0,
      price: 0,
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <ProductFilterSort />
      {user?.role === "admin" && (
        <Button onClick={handleAdd} variant="success" className="mb-2">
          Add Product
        </Button>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flexStart",
        }}
      >
        {products.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
      {showModal && (
        <ProductModal
          data={product}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
