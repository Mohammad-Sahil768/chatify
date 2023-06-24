import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";

function Chatheader({curchat,setcurchat}) {
  return (
    <div
      className="d-flex p-2 ps-3 bg-dark bg-opacity-75 justify-content-center align-items-center"
      style={{ height: "8%" }}
    >
        
      <div className="d-flex align-items-center">
        <BiArrowBack
          onClick={() => setcurchat({})}
          className=""
          style={{ cursor: "pointer" }}
        />
        <p className="fs-5 ms-4 m-auto">
          {curchat.username.charAt(0).toUpperCase() + curchat.username.slice(1)}
        </p>
      </div>
      <div className="ms-auto">
        <AiOutlineSearch className="m-2 fs-5" />
        <FiMoreVertical className="m-2 fs-5" />
      </div>
    </div>
  )
}

export default Chatheader