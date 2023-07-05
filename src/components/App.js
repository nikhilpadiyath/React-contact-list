import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './header';
import AddContact from './addcontact';
import ContactList from './contactlist';
import api from '../api/contacts';


function App() {
  
   const LOCAL_STORAGE_KEY= "contacts";
   const [contacts, setContacts]= useState([]);

   const retrieveContacts = async () => {
    const response = await  api.get("/contacts");
    return response.data;
   }

   const addContactHandler = async (contact) => {

    const request = {
      id: Math.floor(Math.random()*100),
      ...contact
    }

    const response = await api.post("/contacts", request);
        setContacts([...contacts,response.data]);
      };

   const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !==id;
    });
    setContacts(newContactList);
   }

   useEffect(() =>{
   // const retrieveContacts= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if(retrieveContacts) setContacts(retrieveContacts);

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }

    getAllContacts();
  },[]);
   
   useEffect(() =>{
      //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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
