import React from 'react'
import {useState,useEffect} from 'react'
import Welcome from '../welcome/Welcome'
import Chatcontainer from '../chatcontainer/Chatcontainer'
import { useNavigate } from 'react-router-dom'
import Contacts from '../contacts/Contacts'
import axios from 'axios';
function Chatall() {
    let [curchat,setcurchat]=useState({})
    const navigate = useNavigate();
    let [msg,setmsg]=useState("")
    
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      axios
        .post("https://localhost:5000/user-api/pathjump", { token: token })
        .then((res) => {
          if (res.data.success !== true) {
            alert(res.data.message);
            localStorage.clear();
            navigate("/login");
          }
        })
        .catch((err) => alert("Error: " + err.message));
    }, []);
    

  return (
    <div className='row mt-1 flex-grow-1 ' style={{ position: "relative" , height:"100%" }}>

       
       {curchat.username === undefined ? (
        <div className="col col-md-4 d-block p-0">
          <Contacts
            
            msg={msg}
            setmsg={setmsg}
            setcurchat={setcurchat}
          />
        </div>
      ) : (
        <div
          className="col col-md-4 d-none d-md-block p-0"
          
        >
          <Contacts
            
            msg={msg}
            setmsg={setmsg}
            setcurchat={setcurchat}
          />
        </div>
      )}
      <div
        className="col d-none d-md-block p-0 conversations"
        
      >
        {curchat.username === undefined ? (
          <Welcome />
        ) : (
          <Chatcontainer
            curchat={curchat}
            setcurchat={setcurchat}
          />
        )}
      </div>


      {curchat.username !== undefined && (
        <div className="col d-block d-md-none" >
          <Chatcontainer
            setmsg={setmsg}
            curchat={curchat}
            setcurchat={setcurchat}
          />
        </div>
      )}
    
       </div>
   
  )
}

export default Chatall