const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Vote = require("../models/Vote");

const Pusher = require("pusher");

var pusher = new Pusher({
  appId: "1083578",
  key: "314b963309fd17fdc64d",
  secret: "8362be5217cb349f8a7b",
  cluster: "ap1",
  useTLS: true,
});

router.get("/", (req, res) => {
  Vote.find().then((votes) => {
    res.json({ success: true, votes: votes });
  });
});

router.post("/", (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1,
  };

  new Vote(newVote).save().then((vote) => {
    pusher.trigger("channel-os-poll", "event-os-vote", {
      points: parseInt(vote.points),
      os: vote.os,
    });
    return res.json({ sucess: true, message: "thank you for voting" });
  });
});

module.exports = router;
