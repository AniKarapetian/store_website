import React, { useState } from "react";
import { FC } from "react";
import { ProductPage } from "./ProductPage";
import { Button } from "react-bootstrap";
// import { updateProduct, createProduct, removeProduct } from "../../store/product/actions";
import { Product } from "./type";
import ProductModal from "./ProductModal";
import { ProductFilterSort } from "./ProductFilterSort";

const products = [
  {
    id: "2222",
    title: "T-Shirt",
    description: "Woman t-shirt",
    imageUrl:
      "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
    count: 10,
    price: 5000,
  },
  {
    id: "22221",
    title: "T-Shirt",
    description: "Woman t-shirt",
    imageUrl:
      "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
    count: 10,
    price: 5000,
  },
  {
    id: "22222",
    title: "T-Shirt",
    description: "Woman t-shirt",
    imageUrl:
      "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
    count: 10,
    price: 5000,
  },
  {
    id: "22223",
    title: "T-Shirt",
    description: "Woman t-shirt",
    imageUrl:
      "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
    count: 10,
    price: 5000,
  },
  {
    id: "22224",
    title: "T-Shirt",
    description: "Woman t-shirt",
    imageUrl:
      "https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket.jpg",
    count: 10,
    price: 5000,
  },
];

export const ProductsList: FC = () => {
  const [showModal, setShowModal] = useState(false);
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

  const handleSave = (product: Product) => {
    if (product.id) {
      // updateProduct(product);
    } else {
      // createProduct(product);
    }
    handleCancel();
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
  const handleDelete = (id: string) => {
    // removeProduct(id);
  };

  const handleEdit = (product: Product) => {
    setProduct({ ...product });
    toggleModal();
  };
  return (
    <div>
      <ProductFilterSort />
      <Button onClick={handleAdd} variant="success" className="mb-2">
        Add Product
      </Button>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flexStart",
        }}
      >
        {products.map((product) => {
          return <ProductPage product={product} key={product.id} />;
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
