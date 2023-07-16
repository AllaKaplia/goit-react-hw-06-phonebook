import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, changeFilter } from "../redux/contactsSlice";
import ContactList from "./ContactList";
import FilterContacts from "./FilterContacts";
import FormContact from "./FormContact";
import { toast, ToastContainer } from 'react-toastify';
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

    dispatch(addContact(newContact));
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
    window.localStorage.setItem('KEY', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <FormContact addContact={formSubmitHandle} />
      <h2>Contacts</h2>
      <FilterContacts value={filter} onChange={changeFilterHandler} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContactHandler} />
      <ToastContainer theme="colored" />
    </Container>
  );
}