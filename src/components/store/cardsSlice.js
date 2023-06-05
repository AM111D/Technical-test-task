import { createSlice } from '@reduxjs/toolkit';
import {
  decrementFollowers,
  fetchCards,
  incrementFollowers,
} from './operation';

const initialState = {
  cards: [],
  totalItems: 0,
  isLoading: false,
  error: null,
  page: 1,
  limit: 9,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updatePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCards.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        if (action.payload === 0) {
          alert('Контент отсутствует');
        } else {
          state.cards = action.payload;
        }
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(incrementFollowers.fulfilled, (state, action) => {
        const { cardId, updatedFollowers } = action.payload;
        const cardIndex = state.cards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
          state.cards[cardIndex].followers = updatedFollowers;
        }
      })
      .addCase(decrementFollowers.fulfilled, (state, action) => {
        const { cardId, updatedFollowers } = action.payload;
        const cardIndex = state.cards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
          state.cards[cardIndex].followers = updatedFollowers;
        }
      });
  },
});
export const { updatePage } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
