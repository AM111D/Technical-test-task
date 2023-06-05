import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCards,
  fetchPagination,
  incrementFollowers,
} from 'components/store/operation';
import { getPage, getLimit } from 'components/store/selectors';
import { updatePage } from 'components/store/cardsSlice';

function LoadMoreBtn() {
  const dispatch = useDispatch();
  const currentPage = useSelector(getPage);
  const limit = useSelector(getLimit);

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    await dispatch(fetchPagination({ page: nextPage, limit: 3 }));

    dispatch(updatePage(nextPage)); // Обновление текущей страницы
  };

  const back = async () => {
    const backPage = currentPage - 1;
    await dispatch(fetchPagination({ page: backPage, limit: 3 }));

    dispatch(updatePage(backPage)); // Обновление текущей страницы
  };

  return (
    <div>
      <button type="button" onClick={back}>
        BACK
      </button>
      <button type="button" onClick={handleLoadMore}>
        LOAD MORE
      </button>
    </div>
  );
}

export default LoadMoreBtn;
