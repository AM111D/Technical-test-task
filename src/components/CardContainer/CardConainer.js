import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPagination,
  incrementFollowers,
  decrementFollowers,
} from 'components/store/operation';
import { getAllCards, getPage } from 'components/store/selectors';
import { updatePage } from 'components/store/cardsSlice';
import Card from 'components/Card/Card';

function CardContainer() {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const [followedCardIds, setFollowedCardIds] = useState([]);
  const cards = useSelector(getAllCards);

  const fetchData = () => {
    dispatch(fetchPagination({ page, limit: 9 }));
  };

  useEffect(() => {
    const storedPage = localStorage.getItem('page');
    if (storedPage) {
      dispatch(updatePage(Number(storedPage)));
    } else {
      fetchData();
    }

    const storedFollowedCardIds = localStorage.getItem('followedCardIds');
    if (storedFollowedCardIds) {
      const parsedFollowedCardIds = JSON.parse(storedFollowedCardIds);
      setFollowedCardIds(parsedFollowedCardIds);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page]);

  const addFollow = id => {
    dispatch(incrementFollowers(id));
    const updatedFollowedCardIds = [...followedCardIds, id];
    setFollowedCardIds(updatedFollowedCardIds);
    localStorage.setItem(
      'followedCardIds',
      JSON.stringify(updatedFollowedCardIds)
    );
  };

  const removeFollow = id => {
    dispatch(decrementFollowers(id));
    const updatedFollowedCardIds = followedCardIds.filter(
      cardId => cardId !== id
    );
    setFollowedCardIds(updatedFollowedCardIds);
    localStorage.setItem(
      'followedCardIds',
      JSON.stringify(updatedFollowedCardIds)
    );
  };

  return (
    <Card
      cards={cards}
      followedCardIds={followedCardIds}
      addFollow={addFollow}
      removeFollow={removeFollow}
    />
  );
}

export default CardContainer;
