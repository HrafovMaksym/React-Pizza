import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartItems,
  addItems,
  cartItemsIdSelector,
} from "../../redux/cartSlice";
import { Link } from "react-router-dom";
type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
};
const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  types,
  sizes,
}) => {
  const [size, setSize] = React.useState<number>(0);
  const [activeType, setActiveType] = React.useState<number>(0);
  const typesName = ["тонкое", "традиционное"];
  const countItem = useSelector(cartItemsIdSelector(id));
  const addedItem = countItem ? countItem.count : 0;
  const dispatch = useDispatch();
  const onClickAddItem = () => {
    const item: CartItems = {
      id,
      title,
      price,
      type: typesName[activeType],
      size: sizes[size],
      count: 0,
    };
    dispatch(addItems(item));
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}
                key={typeId}
              >
                {typesName[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((value, index) => (
              <li
                key={index}
                onClick={() => setSize(index)}
                className={size === index ? "active" : ""}
              >
                {value} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} $</div>
          <button
            onClick={onClickAddItem}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedItem > 0 && <i>{addedItem}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
