import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    contasts: [
        {
            "id": "id-1", 
            "name": "Rosie Simpson", 
            "number": "459-12-56"
        },
    
        {
            "id": "id-2",
            "name": "Hermione Kline",
            "number": "443-89-12"
        },
    
        {
            "id": "id-3",
            "name": "Eden Clements",
            "number": "645-17-79"
        },
    
        {
            "id": "id-4",
            "name": "Annie Copeland",
            "number": "227-91-26"
        },
    
        {
            "id": "id-5",
            "name": "Dominika Sova",
            "number":"227-91-28"
        }
    ]
}

export const addContact = createAction('contacts/addContact');

export const removeContact = createAction('contacts/removeContact');

export const contactsReducer = createReducer(initialState, {
    [addContact](state, action) {
        return {
            ...state,
            contacts: action.payload,
        };
    },
    [removeContact](state, action) {
        return {
            ...state,
            contacts: state.filter(contact => contact.id !== action.payload),
        };
    },
});