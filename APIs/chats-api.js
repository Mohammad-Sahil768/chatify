const exp = require("express");
const chatsApp = exp.Router();
const mongo = require("mongodb");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


const expressAsyncHandler = require("express-async-handler");

chatsApp.use(exp.json());
chatsApp.use(bodyParser.json());

chatsApp.post(
  "/get-messages",
  expressAsyncHandler(async (req, res) => {
    const ChatCollections= req.app.get(
      "ChatCollections"
    );

    let messagesList = await ChatCollections.find({
        $or: [
          {
            $and: [
              { senderId: req.body.host },
              { receiverId: req.body.curchat },
            ],
          },
          {
            $and: [
              { senderId: req.body.curchat },
              { receiverId: req.body.host },
            ],
          },
        ],
      })
      .toArray();

    res.status(200).send({ message: "Conversation", chat: messagesList });
  })
);

chatsApp.post(
  "/send-message",
  expressAsyncHandler(async (req, res) => {
    const ChatCollections = req.app.get(
      "ChatCollections"
    );

    const newMessage = req.body;

    await ChatCollections.insertOne(newMessage);

    res.status(200).send({ success: true, message: "Message Sent" });
  })
);


chatsApp.post(
  "/delete-message",
  expressAsyncHandler(async (req, res) => {
    const ChatCollections = req.app.get(
      "ChatCollections"
    );

    try {
      await ChatCollections.deleteOne({
        _id: new mongo.ObjectId(req.body._id),
      });
      res.status(201).send({ success: true, message: "Message Deleted.." });
    } catch (err) {
      res.status(400).send({ message: "Error while Deleting Message" });
    }
  })
);

module.exports = chatsApp;