import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import contactsDefault from './contactsDefault.json'; 
import ContactList from "./ContactList";
import FilterContacts from "./FilterContacts";
import FormContact from "./FormContact";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container } from './App.styled';


export default function App(){
  const dispatch = useDispatch();

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('KEY')) ?? contactsDefault
  });
  const [filter, setFilter] = useState('');
  const KEY = contacts;

  useEffect(() => {
    window.localStorage.setItem('KEY', JSON.stringify(KEY));
  })

  const formSubmitHandle = newContact => {
  
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
  
    addContact(newContact);
  }

  const addContact = (contact) => {
    setContacts(prevState => [...prevState, contact]);
  }

  const deleteContact = (contactName) => {
    setContacts(prevState => prevState.filter(contact => contact.name !== contactName));
  }

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  }

  const normalizedFilter = filter ? filter.toLowerCase() : '';
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <FormContact addContact={formSubmitHandle}/>
      <h2>Contacts</h2>
      <FilterContacts value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
      <ToastContainer theme="colored"/>
    </Container>
  );
}