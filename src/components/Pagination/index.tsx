import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { setPageCount } from "../../redux/filterSlice";
import { useDispatch } from "react-redux";
const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=" >"
        previousLabel="< "
        onPageChange={(event) => dispatch(setPageCount(event.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={3}
      />
    </div>
  );
};
export default Pagination;
