import React from "react";
import { nanoid } from 'nanoid';
import { LabelFilter, InputFilter } from "./FilterContacts.styled";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from '../../redux/contactsSlice';

const FilterContacts = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  const onChange = (event) => {
    const newFilterValue = event.target.value;
    dispatch(changeFilter(newFilterValue));
  };

  return (
    <LabelFilter>
      Filter
      <InputFilter
        type="text"
        value={filter}
        id={nanoid()}
        name="filter"
        onChange={onChange} 
      />
    </LabelFilter>
  );
}

export default FilterContacts;