import {useState} from 'react'
import React from 'react'
import Chatheader from '../chatheader/Chatheader';
import Chatbody from '../chatbody/Chatbody';
import Chatfooter from '../chatfooter/Chatfooter';

function Chatcontainer({setmsg,curchat,setcurchat}) {
  let [send, setSend] = useState(false);
  return (

    
    < >
    <div className='chattt' style={{ height: "80vh"}}>
      <Chatheader curchat={curchat} setcurchat={setcurchat} />
      <Chatbody
        curchat={curchat}
        send={send}
        setSend={setSend}
        setmsg={setmsg}
      />
      <Chatfooter curchat={curchat} setSend={setSend} /></div>
    </>
  );
}

export default Chatcontainer