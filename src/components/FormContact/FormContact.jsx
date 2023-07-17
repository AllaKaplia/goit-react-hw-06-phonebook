import * as yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { Input, ButtonAdd, LabelForm, ErrorText } from './FormContact.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addContact } from '../../redux/contactsSlice';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, 'Name is invalid')
    .required('Name is required'),
  number: yup
    .string()
    .matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Phone number is invalid')
    .required('Phone number is required'),
});

const initialValue = {
  name: '',
  number: '',
};

const ErrorError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const FormContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = (newContact, { resetForm }) => {
    const existingContactByName = contacts.find(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const existingContactByNumber = contacts.find(
      (contact) => contact.number === newContact.number
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

    resetForm();
  };

  return (
    <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleFormSubmit}>
      <Form autoComplete='off'>
        <LabelForm>
          The name of the new contact
          <Input
            type='text'
            name='name'
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorError name='name' />
        </LabelForm>
        <LabelForm>
          Phone number
          <Input
            type='tel'
            name='number'
            title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
            required
          />
          <ErrorError name='message' />
        </LabelForm>
        <ButtonAdd type='submit'>Add contact</ButtonAdd>
      </Form>
    </Formik>
  );
};

export default FormContact;