import {
  decrementFollowers,
  fetchCards,
  incrementFollowers,
} from 'components/store/operation';
import { getAllCards } from 'components/store/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Card.module.css';
import askImg from '../img/picture2 1.png';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';

function Card() {
  const [followedCardIds, setFollowedCardIds] = useState([]);
  const dispatch = useDispatch();
  const cards = useSelector(getAllCards);

  // useEffect(() => {
  //   console.log(localStorage.clear());
  // }, []);

  // useEffect(() => {
  //   const persistedFollowedCardIds = localStorage.getItem('followedCardIds');

  //   // Очистить только данные 'persist:root'
  //   localStorage.removeItem('persist:root');

  //   // Восстановить данные 'followedCardIds', если они существуют
  //   if (persistedFollowedCardIds) {
  //     localStorage.setItem('followedCardIds', persistedFollowedCardIds);
  //   }
  // }, []);

  useEffect(() => {
    if (cards.length === 0) {
      dispatch(fetchCards({ page: 1, limit: 3 }));
    }
  }, [cards.length, dispatch]);

  useEffect(() => {
    // Восстановление состояния кнопки из localStorage при загрузке компонента
    const storedFollowedCardIds = localStorage.getItem('followedCardIds');
    if (storedFollowedCardIds) {
      setFollowedCardIds(JSON.parse(storedFollowedCardIds));
    }
  }, []);

  useEffect(() => {
    // Восстановление состояния кнопки из localStorage при загрузке компонента
    const storedFollowedCardIds = localStorage.getItem('followedCardIds');
    if (storedFollowedCardIds) {
      const parsedFollowedCardIds = JSON.parse(storedFollowedCardIds);
      setFollowedCardIds(parsedFollowedCardIds);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('followedCardIds', JSON.stringify(followedCardIds));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
            <img src={askImg} className={css.askImg} />
            <img src={card.avatar} className={css.cardAvatar} alt="user" />
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
