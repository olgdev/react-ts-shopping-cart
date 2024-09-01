import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";

type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export const StoreItem = ({ id, name, price, imgUrl }: storeItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart
  } = useShoppingCart();
  const quontity = getItemQuantity(id);
  return (
    <Card className="store-item-card">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex align-items-baseline justify-content-between mb-4">
          <h2 className="d-flex fs-2 m-0">
            {name}
          </h2>
          <span className="ms-2 text-muted">
            {formatCurrency(price)}
          </span>
        </Card.Title>
        <div className="mt-auto">
          {quontity === 0
            ? <Button
                className="w-100"
                onClick={() => increaseCartQuantity(id)}
              >
                + Add To Cart
              </Button>
            : <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quontity}</span> in cart
                  </div>
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(id)}
                >
                  Rremove
                </Button>
              </div>}
        </div>
      </Card.Body>
    </Card>
  );
};
