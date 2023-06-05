import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPagination } from 'components/store/operation';
import { getPage, getLimit } from 'components/store/selectors';
import { updatePage } from 'components/store/cardsSlice';
import css from './LoadMoreBtn.module.css';

function LoadMoreBtn() {
  const dispatch = useDispatch();
  const currentPage = useSelector(getPage);
  const limit = useSelector(getLimit);

  const handleLoadPage = async page => {
    await dispatch(fetchPagination({ page, limit }));

    dispatch(updatePage(page));
  };

  const renderPaginationNumbers = () => {
    const totalPages = 10;

    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(
        <button
          key={i}
          type="button"
          onClick={() => handleLoadPage(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    return paginationNumbers;
  };

  return (
    <div className={css.paginationBtn}>
      <button
        type="button"
        onClick={() => handleLoadPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        BACK
      </button>
      {renderPaginationNumbers()}
      <button
        type="button"
        onClick={() => handleLoadPage(currentPage + 1)}
        disabled={currentPage === 10}
      >
        NEXT
      </button>
    </div>
  );
}

export default LoadMoreBtn;
