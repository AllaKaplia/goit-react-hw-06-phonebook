import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { ContactsList, ContactItem, RemoveBtn } from './ContactsList.styled';
import { deleteContact, selectVisibleContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);

  const handleDelete = (name) => {
    dispatch(deleteContact(name));
  };

  return (
    <ContactsList>
      {visibleContacts.map(({ name, number }) => (
      <ContactItem key={nanoid()}>
      {name}: {number}
        <RemoveBtn type='button' onClick={() => handleDelete(name)}>
          Remove
        </RemoveBtn>
      </ContactItem>
    ))}
    </ContactsList>
  );
}

export default ContactList;