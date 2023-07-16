import { createSlice } from '@reduxjs/toolkit';
import contactsDefault from './contastsDefault.json';
import { nanoid } from 'nanoid';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const initialState = {
    contacts: contactsDefault,
    filter: '',
};
  
const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
      addContact: (state, action) => {
        const newContact = { ...action.payload, id: nanoid() };
        state.contacts.push(newContact);
      },
      deleteContact: (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.name !== action.payload
        );
      },
      changeFilter: (state, action) => {
        state.filter = action.payload;
      },
    },
});
  

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['contacts']
}
  
export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);
  
export const { addContact, deleteContact, changeFilter } = contactsSlice.actions;