// import {
//   decrementFollowers,
//   fetchCards,
//   incrementFollowers,
// } from 'components/store/operation';
// import { getAllCards } from 'components/store/selectors';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import css from './Card.module.css';
// import askImg from '../img/picture2 1.png';
// import { persistor } from 'components/store/store';

// function Card() {
//   const dispatch = useDispatch();
//   const cards = useSelector(getAllCards);
//   const [followedCardIds, setFollowedCardIds] = useState([]);

//   useEffect(() => {
//     if (cards.length === 0) {
//       dispatch(fetchCards());
//     }
//   }, [cards, dispatch]);

//   const addFollow = id => {
//     dispatch(incrementFollowers(id));
//     setFollowedCardIds(prevIds => [...prevIds, id]);
//   };

//   const removeFollow = id => {
//     dispatch(decrementFollowers(id));
//     setFollowedCardIds(prevIds => prevIds.filter(cardId => cardId !== id));
//   };

//   return (
//     <div className={css.cardContainer}>
//       {cards.map(card => (
//         <div key={card.id} className={css.card}>
//           <img src={askImg} className={css.askImg} />
//           <img src={card.avatar} className={css.cardAvatar} alt="user" />
//           <p className={css.cardTweets}>{card.tweets} tweets</p>
//           <p className={css.cardFollowers}>{card.followers} followers</p>
//           <button
//             type="button"
//             className={
//               followedCardIds.includes(card.id) ? css.btnIsOff : css.btnIsOk
//             }
//             onClick={() =>
//               followedCardIds.includes(card.id)
//                 ? removeFollow(card.id)
//                 : addFollow(card.id)
//             }
//             // disabled={followedCardIds.includes(card.id)}
//           >
//             {followedCardIds.includes(card.id) ? 'FOLLOWING' : 'FOLLOW'}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Card;

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

function Card() {
  const dispatch = useDispatch();
  const cards = useSelector(getAllCards);
  const [followedCardIds, setFollowedCardIds] = useState([]);

  useEffect(() => {
    if (cards.length === 0) {
      dispatch(fetchCards());
    }
  }, [cards, dispatch]);

  useEffect(() => {
    // Восстановление состояния кнопки из localStorage при загрузке компонента
    const storedFollowedCardIds = localStorage.getItem('followedCardIds');
    if (storedFollowedCardIds) {
      setFollowedCardIds(JSON.parse(storedFollowedCardIds));
    }
  }, []);

  const addFollow = id => {
    dispatch(incrementFollowers(id));
    // Обновление состояния кнопки и сохранение в localStorage
    const updatedFollowedCardIds = [...followedCardIds, id];
    setFollowedCardIds(updatedFollowedCardIds);
    localStorage.setItem(
      'followedCardIds',
      JSON.stringify(updatedFollowedCardIds)
    );
  };

  const removeFollow = id => {
    dispatch(decrementFollowers(id));
    // Обновление состояния кнопки и сохранение в localStorage
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
    <div className={css.cardContainer}>
      {cards.map(card => (
        <div key={card.id} className={css.card}>
          <img src={askImg} className={css.askImg} />
          <img src={card.avatar} className={css.cardAvatar} alt="user" />
          <p className={css.cardTweets}>{card.tweets} tweets</p>
          <p className={css.cardFollowers}>{card.followers} followers</p>
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
  );
}

export default Card;
