import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';



const AddContact = ({addContactHandler}) => {
  const[newContact, setNewContact] = useState({name: "", email: ""});
    
  const navigate= useNavigate();

    const add = (e) => {
        e.preventDefault();
        if(newContact.name=== "" || newContact.email===""){
            alert("All fields are mandatory");
            return;
        }
        addContactHandler(newContact);
        console.log(newContact);
        setNewContact({name: "", email: ""});
        navigate('/');
    }
    
        return(
           <div className="ui main">
              <h2>Add Contact</h2>
              <form className="ui form" onSubmit= {add}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" 
                    name="name" 
                    placeholder="Name" 
                    value= {newContact.name}
                    onChange= {(e) =>setNewContact({...newContact,name: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" 
                    name="email" 
                    placeholder="Email"
                    value= {newContact.email}
                    onChange= {(e) =>setNewContact({...newContact, email: e.target.value})}/> 
                </div>
                <div>
               
                <button className="ui button blue">Add Contact</button>
            
             
                </div>
              </form>
           </div>
        );
    }


export default AddContact;