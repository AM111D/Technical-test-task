// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchCards,
//   fetchPagination,
//   incrementFollowers,
// } from 'components/store/operation';
// import { getPage, getLimit } from 'components/store/selectors';
// import { updatePage } from 'components/store/cardsSlice';

// function LoadMoreBtn() {
//   const dispatch = useDispatch();
//   const currentPage = useSelector(getPage);
//   const limit = useSelector(getLimit);

//   const handleLoadMore = async () => {
//     const nextPage = currentPage + 1;
//     await dispatch(fetchPagination({ page: nextPage, limit: 3 }));

//     dispatch(updatePage(nextPage)); // Обновление текущей страницы
//   };

//   const back = async () => {
//     const backPage = currentPage - 1;
//     await dispatch(fetchPagination({ page: backPage, limit: 3 }));

//     dispatch(updatePage(backPage)); // Обновление текущей страницы
//   };

//   return (
//     <div>
//       <button type="button" onClick={back}>
//         BACK
//       </button>
//       <button type="button" onClick={handleLoadMore}>
//         LOAD MORE
//       </button>
//     </div>
//   );
// }

// export default LoadMoreBtn;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCards,
  fetchPagination,
  incrementFollowers,
} from 'components/store/operation';
import { getPage, getLimit } from 'components/store/selectors';
import { updatePage } from 'components/store/cardsSlice';
import css from './LoadMoreBtn.module.css';

function LoadMoreBtn() {
  const dispatch = useDispatch();
  const currentPage = useSelector(getPage);
  const limit = useSelector(getLimit);

  const handleLoadPage = async page => {
    await dispatch(fetchPagination({ page, limit }));

    dispatch(updatePage(page)); // Обновление текущей страницы
  };

  const renderPaginationNumbers = () => {
    const totalPages = 10; // Общее количество страниц

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
        disabled={currentPage === 10} // Предполагая, что у вас всего 10 страниц
      >
        NEXT
      </button>
    </div>
  );
}

export default LoadMoreBtn;
