import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryIdSelector, setCategoryId } from "../redux/filterSlice";
const Categories: React.FC = React.memo(() => {
  const categoriesId = useSelector(categoryIdSelector);
  const dispatch = useDispatch();
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((title, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={categoriesId === index ? "active" : ""}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
