import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  REMOVE_ALERT,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Ashish Prasad',
        email: 'ashish@ashish.com',
        phone: '111111',
        type: 'professional'
      },
      {
        id: 2,
        name: 'Ashisha Prasad',
        email: 'ashisha@ashish.com',
        phone: '222222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Ashishaa Prasad',
        email: 'ashishaa@ashish.com',
        phone: '333333',
        type: 'personal'
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //add contact

  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delte contact

  const deleteContact = id => {
    
    dispatch({ type: DELETE_CONTACT, payload:id  });
  };
  //set current contact

  //clear current contact

  //update the contact

  //filter contact

  //clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
