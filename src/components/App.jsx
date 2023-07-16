import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, changeFilter } from "../redux/contactsSlice";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../redux/store';
import ContactList from "./ContactList";
import FilterContacts from "./FilterContacts";
import FormContact from "./FormContact";
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";
import { Container } from './App.styled';


export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const formSubmitHandle = (newContact) => {
    const existingContactByName = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const existingContactByNumber = contacts.find(
      contact => contact.number === newContact.number
    );

    if (existingContactByName) {
      toast.warn('A contact with this name already exists!');
      return;
    }

    if (existingContactByNumber) {
      toast.info('A contact with this number already exists!');
      return;
    }

    const contactWithId = { ...newContact, id: uuidv4() };
    dispatch(addContact(contactWithId));
  };

  const deleteContactHandler = (contactName) => {
    dispatch(deleteContact(contactName));
  };

  const changeFilterHandler = (evt) => {
    dispatch(changeFilter(evt.currentTarget.value));
  };

  const normalizedFilter = filter ? filter.toLowerCase() : '';
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <PersistGate loading={null} persistor={persistor}>
        <h1>Phonebook</h1>
        <FormContact addContact={formSubmitHandle} />
        <h2>Contacts</h2>
        <FilterContacts value={filter} onChange={changeFilterHandler} />
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContactHandler} />
        <ToastContainer theme="colored" />
      </PersistGate>
    </Container>
  );
}