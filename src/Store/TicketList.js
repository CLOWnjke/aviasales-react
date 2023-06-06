import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  searchId: null,
  status: null,
  slice: 5,
};

export const thunkSearchId = createAsyncThunk('tickets/thunkSearchId', async () => {
  const response = await axios.get('https://aviasales-test-api.kata.academy/search');
  return response.data.searchId;
});

export const fetchTicket = createAsyncThunk('tickets/fetchTicket', async (thunkSearchId, { dispatch }) => {
  const array = [];

  try {
    const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${thunkSearchId}`);
    const { tickets, stop } = await response.data;
    array.push(...tickets);
    if (!stop) {
      array.push(...dispatch(fetchTicket(thunkSearchId)));
    }
    if (stop) {
      dispatch(stopLoading());
    }
  } catch (error) {
    if (error.code === 'ERR_BAD_RESPONSE') {
      array.push(...dispatch(fetchTicket(thunkSearchId)));
    }
  }
  return array;
});

const sliceTickets = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addFiveTickets(state) {
      state.slice = state.slice + 5;
    },
    stopLoading(state) {
      state.status = 'resolved';
    },
    removeAlert(state) {
      state.status = 'done';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkSearchId.pending, (state) => {
      state.status = 'loading';
    }),
      builder.addCase(thunkSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      }),
      builder.addCase(fetchTicket.fulfilled, (state, action) => {
        state.data.push(...action.payload);
      });
  },
});

export const { addFiveTickets, stopLoading, removeAlert } = sliceTickets.actions;
export default sliceTickets.reducer;
