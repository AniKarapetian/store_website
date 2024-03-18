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
import {
  createProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../../actions/products-actions";
import { Basket } from "../basket/type";
import { getBasketByUserId } from "../../actions/basket-actions";

export const ProductsList: FC<any> = ({ showAlert }) => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<Basket>();
  const user = useSelector(userSelector);

  const getData = async () => {
    setProducts(await getProducts());
    if (user) {
      setBasket(await getBasketByUserId(user.id));
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    count: 0,
    price: 0,
  });

  const handleAdd = () => {
    toggleModal();
  };
  const handleDelete = async (id: string) => {
    await removeProduct(id);
    setProducts(products.filter((product) => product.id !== id));
    showAlert("success", "Product removed!");
  };

  const handleSave = async (product: Product) => {
    if (product.id) {
      const updatedProduct = await updateProduct(product);
      showAlert("success", "Product updated!");
      const index = products.findIndex((el) => el.id === product.id);
      products[index] = updatedProduct;
      setProducts([...products]);
    } else {
      product.id = uuid();
      const newProduct = await createProduct(product);
      setProducts([...products, newProduct]);
      showAlert("success", "Product successfully added!");
      handleCancel();
    }
  };
  const handleCancel = () => {
    toggleModal();
    setProduct({
      id: "",
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

  const handleSearch = async (searchItem: string) => {
    setProducts(await getProducts(searchItem));
  };

  const handleSort = (sortBy: string) => {
    const sortedProducts = [...products];
    if (sortBy === "a-z") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "z-a") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  return (
    <div>
      <ProductFilterSort handleSearch={handleSearch} handleSort={handleSort} />
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
            <ProductCard
              product={product}
              key={product.id}
              basket={basket!}
              showAlert={showAlert}
              handleSave={handleSave}
              handleDelete={handleDelete}
            />
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
