import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  decrementFollowers,
  fetchCards,
  incrementFollowers,
} from './operation';
import { useDispatch } from 'react-redux';

const initialState = {
  cards: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 3,
};

const dispatch = useDispatch;

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updateFollowers: (state, action) => {
      state.followedCardIds = action.payload;
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
        state.cards = action.payload;
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
export const { updateFollowers } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
