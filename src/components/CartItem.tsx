import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency.ts";

type CartItemProps = {
  id: number | string;
  quantity: number;
};

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart, toggleCart, cartItems } = useShoppingCart();
  const item = storeItems.find(item => item.id === id);
  if (item === undefined) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ width: 125, height: 75, objectFit: "cover", borderRadius: 5 }}
      />
      <div className="me-auto">
        <h3 style={{ fontSize: "1.25rem", margin: 0 }}>
          {item.name}{" "}
          {quantity > 1 &&
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>}
        </h3>
        <span className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </span> 
      </div>
      <div className="d-flex gap-2 align-items-center">
        {formatCurrency(item.price * quantity)}
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => removeFromCart(item.id)}
          style={{ width: 30, height: 30, lineHeight: 0 }}
        >
          x
        </Button>
      </div>
    </Stack>
  );
};
