const express = require("express");
const router = express.Router();
const Pusher = require("pusher");

var pusher = new Pusher({
  appId: "1083578",
  key: "314b963309fd17fdc64d",
  secret: "8362be5217cb349f8a7b",
  cluster: "ap1",
  useTLS: true,
});

router.get("/", (req, res) => {
  res.json({ message: "poll" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  pusher.trigger("channel-os-poll", "event-os-vote", {
    points: 1,
    os: req.body.os,
  });
  return res.json({ sucess: true, message: "thank you for voting" });
});

module.exports = router;
