type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export const StoreItem = ({ id, name, price, imgUrl }: storeItemProps) => {
  return (
    <div>
      <h1>
        {name}
      </h1>
    </div>
  );
};
