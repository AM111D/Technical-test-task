import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://647a3161a455e257fa6472f1.mockapi.io';

export const fetchCards = createAsyncThunk(
  'cards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cards');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchPagination = createAsyncThunk(
  'cards/fetchAll',
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await axios.get('/cards', {
        params: {
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const incrementFollowers = createAsyncThunk(
  'card/increment',
  async (cardId, thunkAPI) => {
    try {
      const response = await axios.get(`/cards/${cardId}`);
      const card = response.data;

      const updatedFollowers = card.followers + 1;

      await axios.put(`/cards/${cardId}`, { followers: updatedFollowers });

      return { cardId, updatedFollowers };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const decrementFollowers = createAsyncThunk(
  'card/decrement',
  async (cardId, thunkAPI) => {
    try {
      const response = await axios.get(`/cards/${cardId}`);
      const card = response.data;

      const updatedFollowers = card.followers - 1;

      await axios.put(`/cards/${cardId}`, { followers: updatedFollowers });

      return { cardId, updatedFollowers };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
