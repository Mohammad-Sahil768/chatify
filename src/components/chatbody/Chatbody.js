import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {  Spinner } from "react-bootstrap";
import { BsChevronDoubleDown } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";


function Chatbody({curchat,send,setSend,setmsg}) {
  let [messages, setMessages] = useState([]);
  let [host, setHost] = useState("");
  let [isLoaded, setIsLoaded] = useState(true);

  const scrollRef = useRef(null);

  function scrollDown() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    setHost(localStorage.getItem("user"));

    let hosting = localStorage.getItem("user");

    axios
      .post("http://localhost:5000/chats-api/get-messages", {
        host: hosting,
        curchat: curchat.username,
      })
      .then((response) => {
        setMessages(response.data.chat);
        setmsg("");
        setSend(false);
        setIsLoaded(false);
      })
      .catch((err) => console.log(err.message));
  }, [send, curchat]);

  useEffect(() => {
    setIsLoaded(true);
  }, [curchat]);

  if (!isLoaded) {
    return (
      <div className="bg-white d-flex" style={{ height: "82%" }}>
        <Spinner className="m-auto" animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div  className = '' style={{ height: "82%", position: "relative" }}>
      <div
        ref={scrollRef}
        className="d-flex flex-column overflow-auto pb-2 bg-white h-100"
      >
        {messages.length !== 0 ? (
          <div className="mt-auto">
            {messages.map((obj) =>
              obj.senderId === host ? (
                <div
                  className="ms-auto pe-3 mb-1 d-flex"
                  style={{ width: "60%", wordBreak: "break-word" }}
                >
                  <div
                    className="d-inline-block ms-auto fs-6 lead m-0 bg-success pt-1 pb-1 rounded text-white"
                    style={{ position: "relative" }}
                  >
                  
                      <div
                        className="d-flex flex-wrap ms-2 me-2 mt-1"
                        style={{ position: "relative" }}
                      >
                        <p
                          className="m-0 me-2"
                          style={{ position: "relative" }}
                        >
                          {obj.message}
                        </p>
                        <p
                          className="m-0 mt-auto ms-auto p-0 d-inline"
                          style={{ fontSize: "10px" }}
                        >
                          {obj.time}
                        </p>
                      </div>
                    <div
                      className="dropstart"
                      style={{ position: "absolute", top: "0", right: "0" }}
                    >
                      <RiArrowDropDownLine
                        className=" dropdown-toggle fs-4"
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="dropdown"
                      />
                     
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="ps-2 mb-1"
                  style={{ width: "60%", wordBreak: "break-word" }}
                >
                  <div
                    className="lead m-0 fs-6 d-inline-block text-white bg-secondary p-3 pt-1 pb-1 rounded"
                    style={{ position: "relative" }}
                  >
                      <div
                        className="d-flex flex-wrap ms-2 me-2 d-inline"
                        style={{ position: "relative" }}
                      >
                        <p
                          className="m-0 me-2"
                          style={{ position: "relative" }}
                        >
                          {obj.message}
                        </p>
                        <p
                          className="m-0 mt-auto p-0 d-inline"
                          style={{ fontSize: "10px" }}
                        >
                          {obj.time}
                        </p>
                      </div>
                    
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="lead text-secondary m-auto"> Chat is Empty </p>
        )}
      </div>

      <BsChevronDoubleDown
        className="bg-secondary text-white p-1 btn fs-5"
        onClick={scrollDown}
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          cursor: "pointer",
          borderRadius: "50%",
        }}
      />

      
    
    </div>
  );
}

export default Chatbody