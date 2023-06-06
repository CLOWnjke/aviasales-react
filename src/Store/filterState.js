import { createSlice } from '@reduxjs/toolkit';

import { filterNames } from '../utilities/filterNames';

const filterState = new Array(filterNames.length).fill(true);
// const defaultState = {
//   checkedBox: filterState,
//   cheapest: true,
//   fast: false,
//   optimal: false
// };

const initialState = {
  checkedBox: filterState,
  cheapest: true,
  fast: false,
  optimal: false,
};

const filterReducer = createSlice({
  name: 'checked',
  initialState,
  reducers: {
    setChecked(state, action) {
      state.checkedBox[action.payload] = !state.checkedBox[action.payload];
    },
    setCheckedAll(state, action) {
      if (action.payload === 0 && state.checkedBox[0] === true) {
        state.checkedBox.fill(true);
      } else if (action.payload === 0 && state.checkedBox[0] === false) {
        state.checkedBox.fill(false);
      }
      if (state.checkedBox.slice(1).every((el) => el === true)) {
        state.checkedBox[0] = true;
      } else if (!state.checkedBox.slice(1).every((el) => el === true)) {
        state.checkedBox[0] = false;
      }
    },
    setCheapest(state) {
      state.cheapest = true;
      state.fast = false;
      state.optimal = false;
    },
    setFast(state) {
      state.cheapest = false;
      state.fast = true;
      state.optimal = false;
    },
    setOptimal(state) {
      state.cheapest = false;
      state.fast = false;
      state.optimal = true;
    },
  },
});

export const { setChecked, setCheckedAll, setCheapest, setFast, setOptimal } = filterReducer.actions;
export default filterReducer.reducer;

// const filterReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case 'SET_CHECKBOX' :
//       return {...state, checkedBox: state.checkedBox[action.payload] = !state.checkedBox[action.payload]};
//     case 'SET_ALL' :
//       if (action.payload === 0 && state.checkedBox[0] === true) {
//         return {...state, checkedBox: state.checkedBox.fill(true)};
//       } else if (action.payload === 0 && state.checkedBox[0] === false) {
//         return {...state, checkedBox: state.checkedBox.fill(false)};
//       }
//       return {...state, checkedBox: state.checkedBox.fill(true)};
//     case 'SET_CHEAPEST' :
//       return {...state, cheapest: state.cheapest = true, fast: state.fast = false, optimal: state.optimal = false};
//     case 'SET_FAST' :
//       return {...state, cheapest: state.cheapest = false, fast: state.fast = true, optimal: state.optimal = false};
//     case 'SET_OPTIMAL' :
//       return {...state, cheapest: state.cheapest = false, fast: state.fast = false, optimal: state.optimal = true};
//     default :
//       return state;
//   }
// };

// export default filterReducer;
