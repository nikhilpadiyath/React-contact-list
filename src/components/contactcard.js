import React from 'react';
import user from '../images/user.jpg';
import { Link } from 'react-router-dom';

const ContactCard = (props) => {
    const {id,name,email} = props.contact;
return(
    <div className="item">
        <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
              
                <div className="header">{name}</div>
                <div>{email}</div>
            
            <i className="trash alternate outline icon"
            style={{color: "red", marginTop: "7px", cursor: "pointer", marginLeft:'10px'}}
            onClick={() => props.clickHandler(id)} 
            ></i>
<Link to={{ pathname: `/edit`, state: { contact: props.contact}}}>
<i className="edit alternate outline icon"
style={{color: "blue", marginTop: "7px", cursor: "pointer"}}
></i>
</Link>
</div>
</div>

);


}

export default ContactCard;