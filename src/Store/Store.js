import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filterState';
import sliceTickets from './TicketList';

const store = configureStore({
  reducer: {
    filterReducer,
    sliceTickets,
  },
});

export default store;
