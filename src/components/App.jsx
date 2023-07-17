import React from "react";
import ContactList from "./ContactList";
import FilterContacts from "./FilterContacts";
import FormContact from "./FormContact";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container } from './App.styled';


export default function App() {
  return (
    <Container>
      <h1>Phonebook</h1>
      <FormContact />
      <h2>Contacts</h2>
      <FilterContacts />
      <ContactList />
      <ToastContainer theme="colored" />
    </Container>
  );
}