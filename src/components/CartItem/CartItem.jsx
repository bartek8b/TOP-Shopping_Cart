import { useCart } from '../CartProvider/useCart';
import MinusIcon from '../../assets/icons/circle-minus-solid-full.svg?react';
import PlusIcon from '../../assets/icons/circle-plus-solid-full.svg?react';
import TrashIcon from '../../assets/icons/trash-can-solid-full.svg?react';
import RecycleIcon from '../../assets/icons/recycle-solid-full.svg?react';

export const CartItem = ({ product }) => {
  const { addToCart, removeFromCart, deleteFromCart, clearCart } = useCart();

  return <article></article>;
};
