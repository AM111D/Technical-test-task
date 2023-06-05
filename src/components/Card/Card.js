import React from 'react';
import css from './Card.module.css';
import defaultAvatar from '../img/001-boy.svg';
import askImg from '../img/picture2 1.png';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';
import logo from '../img/Vector.svg';

function Card({ cards, followedCardIds, addFollow, removeFollow }) {
  const formatNumber = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleImageError = event => {
    event.target.src = defaultAvatar;
  };

  return (
    <>
      <div className={css.cardContainer}>
        {cards.map(card => (
          <div key={card.id} className={css.card}>
            <div className={css.imageWrapper}>
              <div className={css.circle}></div>
              <img src={askImg} className={css.askImg} alt="placeholder" />
              <img
                src={card.avatar}
                className={css.cardAvatar}
                alt="user"
                onError={handleImageError}
              />
              <img src={logo} className={css.absoluteImage} alt="user" />
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
