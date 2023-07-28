import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './header';
import AddContact from './addcontact';
import ContactList from './contactlist';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import api from '../api/contacts';

function App() {
  
   //const LOCAL_STORAGE_KEY= "contacts";
   const [contacts, setContacts]= useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] = useState([]);

   const retrieveContacts = async() => {
    const response = await api.get("/contacts");
    return response.data;
   }

   const addContactHandler = async (contact) => {
    const request = {
      id: Math.floor(Math.random()*100),
      ...contact,
    };
        const response= await api.post("/contacts",request);
        setContacts([...contacts,response.data]);
      };

     
    const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
  
    const newContactList = contacts.filter((contact) => {
      return contact.id !==id;
    });
    setContacts(newContactList);
   }

   const searchHandler =(searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);

    } else {
      setSearchResults(contacts);
    }


   };

   useEffect(() =>{
    //const retrieveContacts= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if(retrieveContacts) setContacts(retrieveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }
    getAllContacts();
  },[]);
  

 return (
    
    <div className="ui container">
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={
        <ContactList 
        contacts={searchTerm.length <1 ? contacts : searchResults} 
        getContactId= {removeContactHandler} 
        term={searchTerm} 
        searchKeyword= {searchHandler} 
        />}>
        </Route>
        <Route path="/add" element={<AddContact addContactHandler= {addContactHandler}/>}>
        </Route>
       </Routes>
       </Router>
    </div>

  );
}

export default App;
