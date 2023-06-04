import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFollowers } from './selectors';

axios.defaults.baseURL = 'https://647a3161a455e257fa6472f1.mockapi.io';

export const fetchCards = createAsyncThunk(
  'cards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cards');
      //   console.log(response);
      //   console.log(response.data);
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
      // Получаем текущую карточку с бекенда
      const response = await axios.get(`/cards/${cardId}`);
      const card = response.data;

      // Инкрементируем значение followers
      const updatedFollowers = card.followers + 1;

      // Отправляем обновленные данные на бекенд
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
      // Получаем текущую карточку с бекенда
      const response = await axios.get(`/cards/${cardId}`);
      const card = response.data;

      // Инкрементируем значение followers
      const updatedFollowers = card.followers - 1;

      // Отправляем обновленные данные на бекенд
      await axios.put(`/cards/${cardId}`, { followers: updatedFollowers });

      return { cardId, updatedFollowers };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
