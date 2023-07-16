import { createSlice } from '@reduxjs/toolkit';
import contactsDefault from './contastsDefault.json';

const initialState = {
  contacts: JSON.parse(window.localStorage.getItem('KEY')) ?? contactsDefault,
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.name !== action.payload
      );
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, changeFilter } = contactsSlice.actions;
export default contactsSlice.reducer;