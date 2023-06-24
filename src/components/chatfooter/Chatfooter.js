import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSunglasses } from "react-icons/bs";


function Chatfooter({curchat , setSend}) {

  let { handleSubmit } = useForm();
  let [loggedInUser, setLoggedInUser] = useState("");
  let [value, setValue] = useState("");
  

  function submitMessage() {
    let obj = {};
    value = value.trimStart();

    obj.message = value;
    obj.senderId = loggedInUser;
    obj.receiverId = curchat.username;

    let today = new Date();

    let hrs = today.getHours().toString();
    if (hrs.length === 1) hrs = "0".concat(hrs);

    let mins = today.getMinutes().toString();
    if (mins.length === 1) mins = "0".concat(mins);

    let secs = today.getSeconds().toString();
    if (secs.length === 1) secs = "0".concat(secs);

    obj.time = hrs + ":" + mins + ":" + secs;

    if (value.length !== 0) {
      axios
        .post(
          "http://localhost:5000/chats-api/send-message",
          obj
        )
        .then((res) => {
          setSend(true);
          setValue("");
        })
        .catch((err) => console.log(err.message));
    } else {
      setValue("");
    }
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleEmoji(emoji) {
    setValue(value + emoji.emoji);
  }


  useEffect(() => {
    setLoggedInUser(localStorage.getItem("user"));
  }, []);
  
  return (
    <form
      className="footer d-flex align-items-center justify-content-center bg-dark bg-opacity-10"
      style={{ height: "10%" }}
      onSubmit={handleSubmit(submitMessage)}
    >
      <div className="Emoji-picker mt-1 ms-4 d-flex">
        <OverlayTrigger
          trigger={"click"}
          key={"top"}
          placement={"top"}
          rootClose={true}
          overlay={
            <Popover>
              <EmojiPicker onEmojiClick={handleEmoji} />
            </Popover>
          }
        >
          <div className="btn p-0 m-0 border border-none">
            <BsEmojiSunglasses
              style={{ cursor: "pointer" }}
              className="fs-4 ms-1 text-dark bg-primary"
            />
          </div>
        </OverlayTrigger>

      </div>
      <div className="border bg-primary w-75 ms-3">
        <input
          type="text"
          className="fs-6 ps-2 pt-1 pb-1 mt-2 w-100 rounded"
          style={{ wordBreak: "break-word" }}
          placeholder="Message"
          value={value}
          onChange={handleChange}
        />
      </div>

         <Button
            className="btn btn-success pt-0 pb-1 mt-2 ms-2"
            onClick={submitMessage}
          >
            <AiOutlineSend className="fs-6 " />
          </Button>
      
      
    </form>
  );
}

export default Chatfooter