import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './header';
import AddContact from './addcontact';
import ContactList from './contactlist';


function App() {
  
   const LOCAL_STORAGE_KEY= "contacts";
   const [contacts, setContacts]= useState([]);

   const addContactHandler = (contact) => {
        setContacts([...contacts,{ id: Math.floor(Math.random()*100), ...contact}]);
         console.log(contacts);
      };

   const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !==id;
    });
    setContacts(newContactList);
   }

   useEffect(() =>{
    const retrieveContacts= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrieveContacts) setContacts(retrieveContacts);
  },[]);
   
   useEffect(() =>{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
   },[contacts]);

 return (
    
    <div className="ui container">
      <Header />
       <AddContact addContactHandler= {addContactHandler}/>
       <ContactList contacts={contacts} getContactId= {removeContactHandler} />
    
    </div>

  );
}

export default App;
