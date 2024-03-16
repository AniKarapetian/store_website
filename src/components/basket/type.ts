export type BasketItem = {
  id?: string;
  title: string;
  imageUrl: string;
  quantity: number;
  price: number;
};

export type Basket = {
  id?: string;
  userId: string;
  items: BasketItem[];
};
