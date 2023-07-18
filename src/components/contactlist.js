import React from 'react';
import ContactCard from './contactcard';
import {Link} from 'react-router-dom';

const ContactList = (props) => {
    console.log(props);

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

    return(
        <div className= "main">
            <div style={{marginTop: "50px"}}>
                <h3> Contact list
                    <Link to="/add">
                        <button style= {{marginLeft: "100px"}}
                        className= "ui button blue right">
                            Add a New Contact
                        </button>
                    </Link>
                    </h3>
            </div>
        
            <div className="ui celled list">
            {renderContactList}
            </div>
        </div>
    );
    
}

export default ContactList;