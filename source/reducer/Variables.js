import {CHANGE_VARIABLE} from '../actions/type.js';
import {storeData} from '../utils/async-storage.js';

const INITIAL_STATE = {
  amount: '',
  bills: [],
  budget: 0,
  category: '',
  description: '',
  date: '',
  expense: 0,
  selectedCategory: [],
  update: false,
  urgentBills:[]
};

const a = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_VARIABLE:
      var newState = {...state, [action.payload.key]: action.payload.value};
      storeData(newState);
      return newState;
    default:
      return state;
  }
};
export {a as default};
