import React from 'react'
import {useState,useEffect} from 'react'

import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {  AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

function Contacts( {setcurchat} ) {
 
 let [contacts,setContacts] = useState([])
 let [curuser,setcuruser]=useState({})
 let [Host,setHost] = useState("");

 useEffect(() => {
   setHost(localStorage.getItem("user"));
    axios
      .get("http://localhost:5000/user-api/get-users")
      .then((res) =>{ setContacts(res.data.users)
      
         setcuruser(res.data.users.filter((obj)=>{
          if(obj.username === Host){
            return obj
          }
       }))

      })
      .catch((err) => console.log(err));
    
  }, []); 
  
  function handleChange(event) {
    axios
      .get("http://localhost:5000/user-api/get-users")
      .then((res) =>
      setContacts(
          res.data.users.filter((obj) =>
            obj.username.toLowerCase().includes(event.target.value.toLowerCase())
          )
        )
      )
      .catch((err) => console.log(err));
  }

   let getchat=(presentchat)=>{
    setcurchat(presentchat)
   }

  
  return (
    <div className="chatss "  style={{ height: "80vh" }}>
     <div  className='d-flex mx-3 mt-3'>
        <div className='border border-bg-primary '>
            <img src="https://cdn5.vectorstock.com/i/1000x1000/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg" alt="Admin"
            width ={40} height={40} className='border bg-primary rounded' />
        </div>
         <div><p className='lead px-4 '>{Host} </p>
         <p className='lead px-4 '> Hey there i am using chatting app  </p>
         </div>
     </div>


     <div className="ms-2 d-flex align-items-center  mt-1 " >
        <div className="w-100">
          <AiOutlineSearch className="fs-3" />
          <input
            type="search"
            className="w-75 rounded ps-2"
            onChange={handleChange}
            placeholder="Search by username"
          />
        </div>
        <CgProfile
          className="me-2 fs-4"
          style={{ cursor: "pointer" }}
        />
      </div>

    
     <p className='lead  mt-2 mb-2 mx-3'> <b><i>Your Chats...</i></b>    </p>
     <hr className="w-50 ms-1 m-0" />
    <div className="overflow-auto " style={{ position: "relative" , maxHeight:"80%"}}>
        { contacts.map(
          (presentchat) =>
          presentchat.username !== Host && (
              <>
                <NavLink
                  onClick={() => getchat(presentchat)}
                  className="p-3 pb-0 d-flex w-100 text-start text-dark nav-link"
                >
                  <p className="fs-4 d-inline"> {presentchat.username} </p>
                  <p className="fs-6 d-inline ms-auto mt-5 mb-0">
                    {presentchat.username}
                  </p>
                </NavLink>
                <hr className="ms-1 w-75 m-0" />
              </>
            )
        )}
      </div>
    </div>

  )
}

export default Contacts