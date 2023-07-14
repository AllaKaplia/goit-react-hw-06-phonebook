import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';

const initialState = {
    filters: '',
    id: 1
}

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    // filters: filtersReducer,
    // id: idReducer
  },
})