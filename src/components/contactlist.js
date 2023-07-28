import React, { useRef } from 'react';
import ContactCard from './contactcard';
import {Link} from 'react-router-dom';

const ContactList = (props) => {
    const inputRef = useRef('');

    const deleteContactHandler= (id) => {
        props.getContactId(id);
    };

const renderContactList= props.contacts.map((contact)=>{
        return (    
           <ContactCard contact={contact} 
                        clickHandler= {deleteContactHandler}
                        key={contact.id}
           ></ContactCard>
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputRef.current.value);
    };

    return(
        <div className= "main">
            <div style={{marginTop: "50px"}}>
                <h3 className= 'contact-list'> Contact list
                    <Link to="/add">
                        <button style= {{marginLeft: "100px"}}
                        className= "ui button blue right">
                            Add a New Contact
                        </button>
                    </Link>
                    </h3>
                    <div className= 'ui search'>
                        <div className='ui icon input'>
                            <input 
                            ref={inputRef} 
                            type='text' 
                            placeholder='Search Contacts' 
                            className= 'prompt' 
                            value={props.term} 
                            onChange={getSearchTerm}></input>
                            <i className='search icon'></i>
                        </div>
            </div>
        
            <div className="ui celled list">
            {renderContactList.length > 0 ? renderContactList : 'No contacts found'}
            </div>
        </div>
    </div>
    );
    
}

export default ContactList;