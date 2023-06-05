import {
  decrementFollowers,
  fetchCards,
  fetchPage,
  fetchPagination,
  incrementFollowers,
} from 'components/store/operation';
import { getAllCards, getPage } from 'components/store/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Card.module.css';
import askImg from '../img/picture2 1.png';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';
import { updatePage } from 'components/store/cardsSlice';

function Card() {
  const page = useSelector(getPage);
  const [followedCardIds, setFollowedCardIds] = useState([]);
  const dispatch = useDispatch();
  const cards = useSelector(getAllCards);
  const fetchData = () => {
    dispatch(fetchPagination({ page: 1, limit: 3 })); // Здесь должен быть ваш действующий метод для получения данных с бэкенда
  };

  useEffect(() => {
    dispatch(updatePage(1)); // Установка начального значения страницы в 1
    fetchData();

    const storedFollowedCardIds = localStorage.getItem('followedCardIds');
    if (storedFollowedCardIds) {
      const parsedFollowedCardIds = JSON.parse(storedFollowedCardIds);
      setFollowedCardIds(parsedFollowedCardIds);
    }
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem('followedCardIds', JSON.stringify(followedCardIds));
      localStorage.setItem('currentPage', page.toString()); // Обновление текущей страницы на 1 в localStorage
    };

    window.addEventListener('unload', handleUnload);
    localStorage.setItem('currentPage', 1);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [followedCardIds]);

  const addFollow = id => {
    dispatch(incrementFollowers(id));
    const updatedFollowedCardIds = [...followedCardIds, id];
    setFollowedCardIds(updatedFollowedCardIds);
  };

  const removeFollow = id => {
    dispatch(decrementFollowers(id));
    const updatedFollowedCardIds = followedCardIds.filter(
      cardId => cardId !== id
    );
    setFollowedCardIds(updatedFollowedCardIds);
  };

  const formatNumber = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      <div className={css.cardContainer}>
        {cards.map(card => (
          <div key={card.id} className={css.card}>
            <div className={css.imageWrapper}>
              <div className={css.circle}></div>
              <img src={askImg} className={css.askImg} alt="placeholder" />
              <img src={card.avatar} className={css.cardAvatar} alt="user" />
            </div>
            <p className={css.cardTweets}>{formatNumber(card.tweets)} tweets</p>
            <p className={css.cardFollowers}>
              {formatNumber(card.followers)} followers
            </p>
            <button
              type="button"
              className={
                followedCardIds.includes(card.id) ? css.btnIsOff : css.btnIsOk
              }
              onClick={() =>
                followedCardIds.includes(card.id)
                  ? removeFollow(card.id)
                  : addFollow(card.id)
              }
              // disabled={followedCardIds.includes(card.id)}
            >
              {followedCardIds.includes(card.id) ? 'FOLLOWING' : 'FOLLOW'}
            </button>
          </div>
        ))}
      </div>
      <LoadMoreBtn />
    </>
  );
}

export default Card;
