import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { fetchPizzas, pizzaStatusSelector } from "../redux/pizzaSlice";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector } from "../redux/filterSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const { pizzas, status } = useSelector(pizzaStatusSelector);

  const { categoryId, sort, searchValue, pageCount } =
    useSelector(filterSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";
    const currentPage = `page=${pageCount}`;
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      })
    );
    window.scroll(0, 0);
  }, [categoryId, sort, searchValue, pageCount]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const items = pizzas.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h1>
            Ничего не найдено <span>😞</span>
          </h1>
          <p>
            К сожалению не удалось получить пиццы. Попробуйте снова чуть позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : items}
        </div>
      )}

      <Pagination />
    </>
  );
};

export default Home;
