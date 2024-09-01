import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { CartItem } from "./CartItem.tsx";
import { formatCurrency } from "../utilities/formatCurrency.ts";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { toggleCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={toggleCart} placement="end">
      <Offcanvas.Header>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => <CartItem key={item.id} {...item} />)}
          <div className="ms-auto fs-5">
            <strong>
              Total:{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find(i => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </strong>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
