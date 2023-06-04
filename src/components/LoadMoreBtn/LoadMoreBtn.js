import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from 'components/store/operation';
import { getPage } from 'components/store/selectors';

function LoadMoreBtn() {
  const dispatch = useDispatch();
  const currentPage = useSelector(getPage);
  const limit = 3; // Устанавливаем жесткое значение limit равное 3

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(fetchCards({ page: nextPage, limit }));
  };

  return (
    <button type="button" onClick={handleLoadMore}>
      LOAD MORE
    </button>
  );
}

export default LoadMoreBtn;
