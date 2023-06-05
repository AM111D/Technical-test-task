import { createSelector } from '@reduxjs/toolkit';

export const getAllCards = state => state.cards.cards;

export const getFollowers = createSelector(getAllCards, cards =>
  cards.map(card => card.followers)
);

export const getPage = state => state.cards.page;

export const getLimit = state => state.cards.limit;

// export const getPage = state => console.log(state.cards.page);

// export const getLimit = state => console.log(state.cards.limit);

// export const getPageAndLimit = createSelector(
//   [getPage, getLimit],
//   (page, limit) => ({
//     page,
//     limit,
//   })
// );
