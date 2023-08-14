import React, { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm/ContactForm ';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList ';
import Filter from './Filter/Filter ';
import css from './App.module.css';

export default function App() {

  const initialContacts = () => {
    const contactsLs = JSON.parse(localStorage.getItem('contacts'));
    if (!contactsLs) {
      return [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];
    }
    return contactsLs;
  };

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  const handleAddContact = e => {
    if (contacts.find(contact => contact.name === e.name)) {
      alert(`${e.name} is already in the contacts`);
      return;
    }
    const contactEl = {
      id: nanoid(),
      name: e.name,
      number: e.number,
    };
    setContacts(prevContacts => [contactEl, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVissibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };
  useEffect(() => {
    if (isFirstRender.current && contacts.length === 0) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    console.log('useeffect');
    const contactsFromLs = localStorage.getItem('contacts');
    const parseContactsFromLs = JSON.parse(contactsFromLs);
    console.log('parseContactsFromLs', parseContactsFromLs);
    if (parseContactsFromLs && parseContactsFromLs.length !== 0) {
      setContacts(parseContactsFromLs);
    } else
      setContacts([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]);
  }, []);

  return (
    <>
      <div className={css.div}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />

        <h2>Contacts</h2>
        <Filter filterEl={filter} onChangeEl={changeFilter} />
        <ContactList
          contactsArr={getVissibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );
}

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   handleAddContact = e => {
//     // const elNormalized = e.name.toLowerCase();
//     if (this.state.contacts.find(contact => contact.name === e.name)) {
//       alert(`${e.name} is already in contacts.`);
//       return;
//     }
//     const contactEl = {
//       id: nanoid(),
//       name: e.name,
//       number: e.number,
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [contactEl, ...contacts],
//     }));
//     console.log('this.state.name', this.state.name);
//     console.log('this.state.number', this.state.number);
//     console.log('this.state.contacts', this.state.contacts);
//   };
//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };
//   getVissibleContacts = () => {
//     const normalizedFilter = this.state.filter.toLowerCase();
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   componentDidMount() {
//     const contactsFromLs = localStorage.getItem('contacts');
//     const parseContctsFromLs = JSON.parse(contactsFromLs);
//     console.log('contactsFromLsParse', parseContctsFromLs);

//     if (parseContctsFromLs) {
//       this.setState({ contacts: parseContctsFromLs });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log('State', this.state);
//     console.log('prevState', prevState);
//     if (prevState !== this.state) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     return (
//       <div className={css.div}>
//         <h1>Phonebook</h1>
//         <ContactForm onAddContact={this.handleAddContact} />

//         <h2>Contacts</h2>
//         <Filter filterEl={this.state.filter} onChangeEl={this.changeFilter} />
//         <ContactList
//           contactsArr={this.getVissibleContacts()}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

// export default App;
