import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { Product } from "./type";
import ProductModal from "./ProductModal";
import { ProductFilterSort } from "./ProductFilterSort";
import { ProductCard } from "./ProductCard";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { v4 as uuid } from "uuid";
import { createProduct, getProducts } from "../../actions/products-actions";
import { Basket } from "../basket/type";
import { getBasketByUserId } from "../../actions/basket-actions";

export const ProductsList: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<Basket>();
  const user = useSelector(userSelector);

  const getData = async () => {
    if (user) {
      setProducts(await getProducts());
      setBasket(await getBasketByUserId(user.id));
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [product, setProduct] = useState<Product>({
    id: uuid(),
    title: "",
    description: "",
    imageUrl: "",
    count: 0,
    price: 0,
  });

  const handleAdd = () => {
    toggleModal();
  };

  const handleSave = (product: Product) => {
    createProduct(product);
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
          return (
            <ProductCard product={product} key={product.id} basket={basket!} />
          );
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
